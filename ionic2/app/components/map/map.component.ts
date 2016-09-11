import { Directive, ElementRef, AfterViewInit } from '@angular/core';

//let PokeMap = require('pokemap-1');
let PokeMap = require('pokemap-2');

@Directive({
  selector: 'map'
})
export class MapComponent {

  private map;

  constructor(private element: ElementRef) {
    let coordinates = {latitude: 48.264673, longitude: 11.671434};
    let zoomLevel = 17;

    this.map = new PokeMap(this.element.nativeElement, {coordinates, zoomLevel});
  }

  get coordinates(): {latitude:number, longitude:number} {
    return this.map.coordinates;
  }

  get zoomLevel(): number {
    return this.map.zoomLevel;
  }

  goTo(coordinates: {latitude:number, longitude:number}, zoomLevel:number = null) {
    if (zoomLevel === null) {
      zoomLevel = this.zoomLevel;
    }
    this.map.goTo(coordinates, zoomLevel);
  }

}

