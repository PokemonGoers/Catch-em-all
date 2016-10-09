import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { PokeSighting } from '../../models/poke-sighting';
import { PokePrediction } from '../../models/poke-prediction';
import { PokeMob } from '../../models/poke-mob';
import { PokePOI } from '../../models/poke-poi';
import { Filter } from '../../models/filter';

let PokeMap = require('pokemap-1');

@Component({
  selector: 'map',
  template: '<div #mapcontainer style="width: 100%; height: 100%;"></div>',
  styles: [require('./map.component.scss')]
})
export class MapComponent {

  @ViewChild('mapcontainer') mapcontainer;
  private map;

  constructor(private events: Events) {}

  initialize(options) {
    this.map = new PokeMap(this.mapcontainer.nativeElement, options);

    this.onClick(console.debug.bind(null, 'map:onClick'));
    this.onMove(console.debug.bind(null, 'map:onMove'));

    this.events.subscribe('map:directions', data => this.showDirections(...data));
  }

  get initialized(): boolean {
    return this.map !== undefined;
  }

  goTo(position) {
    console.debug('map:goTo', position);
    this.map.goTo(position);
  }

  filter(filter: Filter) {
    // TODO: Map filter to Date() and pass to Pokemap
    let filterObj: FilterOptions = {
      pokemonIds: filter.selectedPokemon,
      sightingsSince: filter.sightingsRange,
      predictionsUntil: filter.predictionsRange
    };
    console.debug('map:filter', filter);
    // this.map.filter(filterObj);
  }

  onClick(callback) {
    this.map.on('click', pokePOI => callback(MapComponent.mapPokePOI(pokePOI)));
  }

  onMove(callback) {
    this.map.on('move', callback);
  }

  showDirections(destination) {
    this.map.clearRoutes();

    Geolocation.getCurrentPosition().then(position => {
      let start = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.map.navigate(start, destination);
    })
  }

  private static mapPokePOI(pokePOI: Object): (PokeSighting | PokePrediction | PokeMob) {
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
