import { ViewChild, forwardRef } from '@angular/core';
import { NavParams, Page, PopoverController, Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover.component';
import { MapComponent } from '../../components/map/map.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConfigService } from '../../services/config.service';
import { PokePOICardComponent } from '../../components/poke-poi-card/poke-poi-card.component';
import { PokeSighting } from '../../models/poke-sighting';
import { Filter } from '../../models/filter';

@Page({
  template: require('./map.page.html'),
  styles: [require('./map.page.scss')],
  directives: [
    forwardRef(() => NavbarComponent),
    MapComponent,
    PokePOICardComponent
  ]
})
export class MapPage {

  @ViewChild(MapComponent) map: MapComponent;
  @ViewChild(PokePOICardComponent) pokePOICard: PokePOICardComponent;


  static ZOOM_LEVEL = 17;

  positionLoaded: Promise<any> = null;

  filter: Filter;

  constructor(private navParams: NavParams,
              private config:ConfigService,
              private popoverCtrl: PopoverController,
              private events: Events) {
    this.positionLoaded = this.loadPosition();
    this.filter = new Filter(5, 5, []); //TODO: FilterService to handle storing
    this.events.subscribe('filter:changed', ( obj ) => {
      this.filter = obj[0];
      this.map.filter(this.filter);
    });
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
    this.positionLoaded.then(position => this.map.goTo(position));
  }

  initializeMap() {
    let filter = this.filter;
    let apiEndpoint = this.config.apiEndpoint;
    let tileLayer = 'http://{s}.tile.opencyclemap.org/transport/{z}/{x}/{y}.png';

    this.map.initialize({filter, apiEndpoint, tileLayer});

    this.map.onClick(pokePOI => {
      if (pokePOI instanceof PokeSighting) {
        this.pokePOICard.show(pokePOI);
      }
    });
  }

  showFilterPopover($event?): void {
    let filter = this.filter;
    let popover = this.popoverCtrl.create(FilterPopoverComponent, { filter });
    popover.present({
      ev: $event
    });
  }
}
