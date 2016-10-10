import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';

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

    this.map.on('click', this.onClick.bind(this));
    this.map.on('move', this.onMove.bind(this));

    this.events.subscribe('map:filter', ([filter]) => this.filter(filter));
    this.events.subscribe('map:goto', ([position]) => this.goTo(position));
  }

  get initialized(): boolean {
    return this.map !== undefined;
  }

  private goTo(position) {
    console.debug('map:goTo', position);
    this.map.goTo(position);
  }

  private filter(filter: Filter) {
    console.debug('map:filter', filter);
    //this.map.filter(filter);
  }

  private onClick(pokePOI) {
    console.debug('map:click', pokePOI);
    this.events.publish('map:click', MapComponent.mapPokePOI(pokePOI));
  }

  private onMove(position) {
    console.debug('map:move', position);
    this.events.publish('map:move', position);
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
