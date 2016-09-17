import { Component, ElementRef } from '@angular/core';
import { Events } from 'ionic-angular';

//let PokeMap = require('pokemap-1');
//let PokeMap = require('pokemap-2');

require('!style!css!sass!leaflet/dist/leaflet.css');
declare var window: any;
window.L = require('leaflet');

// Dummy PokeMap class until PokeMaps are implemented
let PokeMap: any = function(...args) {console.debug('map:constructor', ...args)};
PokeMap.prototype.on = function(...args) {console.debug('map:on', ...args)};
PokeMap.prototype.goTo = function(...args) {console.debug('map:goTo', ...args)};
PokeMap.prototype.filter = function(...args) {console.debug('map:filter', ...args)};

@Component({
  selector: 'map',
  template: '',
  styles: [require('./map.component.scss')]
})
export class MapComponent {

  private map;

  constructor(private element: ElementRef) {}

  initialize(options) {
    this.map = new PokeMap(this.element.nativeElement, options);
  }

  get initialized(): boolean {
    return this.map !== undefined;
  }

  goTo(position) {
    this.map.goTo(position);
  }

  filter(filterOptions: FilterOptions) {
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
