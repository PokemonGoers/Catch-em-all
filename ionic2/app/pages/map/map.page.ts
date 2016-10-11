import { ViewChild, forwardRef } from '@angular/core';
import { NavParams, Page, PopoverController, Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { FilterComponent } from '../../components/filter/filter.component';
import { MapComponent } from '../../components/map/map.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConfigService } from '../../services/config.service';
import { POICardComponent } from '../../components/poi-card/poi-card.component';
import { PokeSighting } from '../../models/poke-sighting';
import { Filter } from '../../models/filter';
import { FilterService } from '../../services/filter.service';

@Page({
  template: require('./map.page.html'),
  styles: [require('./map.page.scss')],
  directives: [
    forwardRef(() => NavbarComponent),
    MapComponent,
    POICardComponent
  ]
})
export class MapPage {

  @ViewChild(MapComponent) map: MapComponent;
  @ViewChild(POICardComponent) pokePOICard: POICardComponent;


  static ZOOM_LEVEL = 17;

  positionLoaded: Promise<any> = null;

  constructor(private navParams: NavParams,
              private config:ConfigService,
              private popoverCtrl: PopoverController,
              private events: Events,
              private filterService: FilterService) {
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

  ionViewDidEnter() {
    this.initializeMap();
    this.positionLoaded.then(position => this.events.publish('map:goto', position));
  }

  initializeMap() {
    let filter = this.filterService.filter;
    let tileLayer = 'https://api.mapbox.com/styles/v1/poulzinho/ciu2fc21400k32iqi2gkb7h7g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG91bHppbmhvIiwiYSI6ImNpdTJmMmlwMTAwMHAyeW55NmVpbXpoY3oifQ._S-9Yx6OXlnMMq_MgsodlA';
    let apiEndpoint = this.config.apiEndpoint;
    let websocketEndpoint = this.config.websocketEndpoint;

    this.map.initialize({filter, tileLayer, apiEndpoint, websocketEndpoint});
  }

  showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterComponent);
    popover.present({
      ev: $event
    });
  }
}
