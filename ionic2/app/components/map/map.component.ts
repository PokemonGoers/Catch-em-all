import { Component, ViewChild } from '@angular/core';

let PokeMap = require('pokemap-2');

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
    this.map.on('click', callback);
  }

  onMove(callback) {
    this.map.on('move', callback);
  }

}

export type FilterOptions = {
  pokemonIds: number[];
  sightingsSince: number; // Time in seconds
  predictionsUntil: number; // Time in seconds
}
