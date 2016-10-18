import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { Sighting } from '../../models/sighting';
import { Prediction } from '../../models/prediction';
import { Mob } from '../../models/mob';
import { POI } from '../../models/poi';
import { Filter } from '../../models/filter';

let PokeMap = require('pokemap-1');

@Component({
  selector: 'poke-map',
  template: '<div #mapcontainer style="width: 100%; height: 100%;"></div>',
  styles: [require('./map.component.scss')]
})
export class MapComponent {

  @ViewChild('mapcontainer') mapcontainer;
  private map;

  constructor(private events: Events) { }

  initialize(options) {
    this.map = new PokeMap(this.mapcontainer.nativeElement, options);

    this.map.on('click', this.onClick.bind(this));
    this.map.on('move', this.onMove.bind(this));

    this.events.subscribe('map:filter', ([filter]) => this.filter(filter));
    this.events.subscribe('map:goto', ([position]) => this.goTo(position));
    this.events.subscribe('map:directions', ([destination]) => this.showDirections(destination));
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

  private onClick(poi) {
    console.debug('map:click', poi);
    this.events.publish('map:click', poiFromMapEventData(poi));
  }

  private onMove(position) {
    console.debug('map:move', position);
    this.events.publish('map:move', position);
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
}

function poiFromMapEventData(rawData: any) : POI {
  if ('source' in rawData) {
    const sighting = new Sighting();
    Object.assign(sighting, {
      latitude: rawData.location.coordinates[1],
      longitude: rawData.location.coordinates[0],
      pokemonId: rawData.pokemonId,
      source: rawData.source,
      appearedOn: rawData.appearedOn
    })
    return sighting;
  } else if ('clusterId' in rawData) {
    const mob = new Mob();
    return mob;
  } else {
    throw new Error('POI cannot be identified as ' +
                    'Sighting or Mob:\n' + JSON.stringify(rawData));
  }
}
