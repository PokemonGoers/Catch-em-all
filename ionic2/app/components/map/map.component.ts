import { Directive, Input, ElementRef, OnInit } from '@angular/core';

//let PokeMap = require('pokemap-1');
//let PokeMap = require('pokemap-2');

// Dummy PokeMap class until PokeMaps are implemented
let PokeMap: any = function(...args) {console.debug('map:constructor', ...args)};
PokeMap.prototype.on = function(...args) {console.debug('map:on', ...args)};
PokeMap.prototype.goTo = function(...args) {console.debug('map:goTo', ...args)};
PokeMap.prototype.updateTimeRange = function(...args) {console.debug('map:updateTimeRange', ...args)};

@Directive({
  selector: 'map'
})
export class MapComponent implements OnInit {

  private map;

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() timeRangeFrom: number;
  @Input() timeRangeTo: number;
  @Input() apiEndpoint: string;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    let coordinates = {latitude: this.latitude, longitude: this.longitude};
    let timeRange = {from: this.timeRangeFrom, to: this.timeRangeTo};
    let apiEndpoint = this.apiEndpoint;

    this.map = new PokeMap(this.element.nativeElement, {coordinates, timeRange, apiEndpoint});

    this.map.on('click', this.onClick.bind(this));
    this.map.on('move', this.onMove.bind(this));
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

