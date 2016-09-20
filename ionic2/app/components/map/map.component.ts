import { Component, Input, ElementRef, OnInit } from '@angular/core';

//let PokeMap = require('pokemap-1');
//let PokeMap = require('pokemap-2');

// Dummy PokeMap class until PokeMaps are implemented
let PokeMap: any = function(...args) {console.debug('map:constructor', ...args)};
PokeMap.prototype.on = function(...args) {console.debug('map:on', ...args)};
PokeMap.prototype.goTo = function(...args) {console.debug('map:goTo', ...args)};
PokeMap.prototype.updateTimeRange = function(...args) {console.debug('map:updateTimeRange', ...args)};

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

    this.map.on('click', this.onClick.bind(this));
    this.map.on('move', this.onMove.bind(this));
  }

  get initialized(): boolean {
    return this.map !== undefined;
  }

  goTo(coordinates: {latitude:number, longitude:number}) {
    this.map.goTo(coordinates);
  }

  updateTimeRange(timeRange: {from: number, to:number}) {
    this.map.updateTimeRange(timeRange);
  }

  onClick(pokePOI) {

  }

  onMove({coordinates: {latitude, longitude}, zoomLevel}) {

  }

}
