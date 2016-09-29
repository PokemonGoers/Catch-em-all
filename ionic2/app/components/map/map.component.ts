import { Component, ViewChild } from '@angular/core';
import { PokeSighting } from '../../models/poke-sighting';
import { PokePrediction } from '../../models/poke-prediction';
import { PokeMob } from '../../models/poke-mob';
import { PokePOI } from '../../models/poke-poi';

let PokeMap = require('pokemap-1');

@Component({
  selector: 'map',
  template: '<div #mapcontainer style="width: 100%; height: 100%;"></div>',
  styles: [require('./map.component.scss')]
})
export class MapComponent {

  @ViewChild('mapcontainer') mapcontainer;
  private map;

  constructor() {}

  initialize(options) {
    this.map = new PokeMap(this.mapcontainer.nativeElement, options);

    this.onClick(console.debug.bind(null, 'map:onClick'));
    this.onMove(console.debug.bind(null, 'map:onMove'));
  }

  get initialized(): boolean {
    return this.map !== undefined;
  }

  goTo(position) {
    console.debug('map:goTo', position);
    this.map.goTo(position);
  }

  filter(filterOptions: FilterOptions) {
    console.debug('map:filter', filterOptions);
    this.map.filter(filterOptions);
  }

  onClick(callback) {
    this.map.on('click', pokePOI => callback(MapComponent.mapPokePOI(pokePOI)));
  }

  onMove(callback) {
    this.map.on('move', callback);
  }

  private static mapPokePOI(pokePOI: Object) : (PokeSighting | PokePrediction | PokeMob) {
    if ('source' in pokePOI) {
      return PokeSighting.fromObject(pokePOI);
    } else if ('clusterId' in pokePOI) {
      return PokeMob.fromObject(pokePOI);
    } else {
      throw new Error('PokePOI cannot be identified as PokeSighting or PokeMob:\n' + JSON.stringify(pokePOI));
    }
  }

}

export type FilterOptions = {
  pokemonIds: number[];
  sightingsSince: number; // Time in seconds
  predictionsUntil: number; // Time in seconds
}
