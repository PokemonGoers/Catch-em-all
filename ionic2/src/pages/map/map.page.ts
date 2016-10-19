import { ViewChild, Component } from '@angular/core';
import { NavParams, PopoverController, Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { FilterComponent } from '../../components/filter/filter.component';
import { MapComponent } from '../../components/map/map.component';
import { ConfigService } from '../../services/config.service';
import { POICardComponent } from '../../components/poi-card/poi-card.component';
import { FilterService } from '../../services/filter.service';
import { Mob } from '../../models/mob';

@Component({
  selector: 'map-page',
  templateUrl: './map.page.html'
})
export class MapPage {

  @ViewChild(MapComponent) map: MapComponent;
  @ViewChild(POICardComponent) pokePOICard: POICardComponent;


  static ZOOM_LEVEL = 17;

  positionLoaded: Promise<any> = null;

  constructor(private navParams: NavParams,
              private config: ConfigService,
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

  showArtificialMob() {
    const mob = new Mob();
    mob.clusterId = 123;
    mob.tweets = [
      { id: '1', text: 'hello', latitude: 1, longitude: 2, timestamp: 123 },
      { id: '2', text: 'world', latitude: 1, longitude: 2, timestamp: 123 },
      { id: '3', text: 'hello', latitude: 1, longitude: 2, timestamp: 123 },
      { id: '4', text: 'world', latitude: 1, longitude: 2, timestamp: 123 },
    ];
    mob.longitude = 48.184858933932304;
    mob.latitude = 11.732025146484373;
    mob.timestamp = 1476796355282;
    this.events.publish('map:click', mob);
  }
}
