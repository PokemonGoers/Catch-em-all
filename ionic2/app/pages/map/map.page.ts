import { ViewChild, AfterViewInit, forwardRef } from '@angular/core';
import { Page, Events, PopoverController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover.component';
import { MapComponent } from '../../components/map/map.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FilterOptions } from '../../components/map/map.component';

@Page({
  template: require('./map.page.html'),
  directives: [
    forwardRef(() => NavbarComponent),
    MapComponent
  ]
})
export class MapPage implements AfterViewInit {

  @ViewChild(MapComponent) map: MapComponent;

  static ZOOM_LEVEL = 17;

  positionLoaded: Promise<any> = null;

  filter: FilterOptions = {
    pokemonIds: null,
    sightingsSince: 1800,
    predictionsUntil: 1800
  };

  constructor(private popoverCtrl: PopoverController, private events: Events, private navParams: NavParams) {
    this.positionLoaded = this.loadPosition();
  }

  loadPosition() {
    let position = this.navParams.get('position');

    if (position) {
      return Promise.resolve(position);
    } else {
      return Geolocation.getCurrentPosition()
        .then(position => {
          return {
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            zoomLevel: MapPage.ZOOM_LEVEL
          };
        });
    }
  }

  ngAfterViewInit() {
    // At this point the final dimensions of the map element are not known yet.
    // By waiting 100ms we can avoid that the map is instantiated to the wrong dimensions.
    // TODO Find a better method to avoid this hack.
    setTimeout(() => {
      this.initializeMap();
      this.positionLoaded.then(position => this.map.goTo(position));
    }, 100);
  }

  initializeMap() {
    let filter = this.filter;
    let apiEndpoint = window.location.origin;
    let tileLayer = 'http://{s}.tile.opencyclemap.org/transport/{z}/{x}/{y}.png';

    this.map.initialize({filter, apiEndpoint, tileLayer});
  }

  applyFilterChange() {
    this.map.filter(this.filter);
  }

  showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopoverComponent, this.filter);
    popover.present({
      ev: $event
    });
  }
}
