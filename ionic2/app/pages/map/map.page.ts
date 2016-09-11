import { ViewChild, OnInit, forwardRef } from '@angular/core';
import { Page, Events, PopoverController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover.component';
import { MapComponent } from '../../components/map/map.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Page({
  templateUrl: 'pages/map/map.page.html',
  directives: [
    forwardRef(() => NavbarComponent),
    MapComponent
  ]
})
export class MapPage implements OnInit {

  @ViewChild(MapComponent) map: MapComponent;

  requestPosition: Promise<any> = null;
  latitude: number;
  longitude: number;

  filter = {
    time: {
      lower: 0,
      upper: 60
    }
  };

  constructor(private popoverCtrl: PopoverController, private events: Events, navParams: NavParams) {
    if (navParams.get('latitude') && navParams.get('longitude')) {
      this.latitude = navParams.get('latitude');
      this.longitude = navParams.get('longitude');
    } else {
      this.requestPosition = Geolocation.getCurrentPosition();
    }
  }

  ngOnInit() {
    this.events.subscribe('filter:changed:time', (time: Object) => {
      this.filter.time = time[0];

      if (this.map && this.map.initialized) {
        this.map.updateTimeRange({from: time[0].lower, to: time[0].upper});
      }
    });

    if (this.requestPosition) {
      this.requestPosition
        .then(position => this.initializeMap({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }))
        .catch(error => this.initializeMap({
          latitude: 48.264673,
          longitude: 11.671434
        }));
    } else {
      this.initializeMap({
        latitude: this.latitude,
        longitude: this.longitude
      })
    }
  }

  initializeMap(coordinates) {
    let timeRange = {from: this.filter.time.lower, to: this.filter.time.upper};
    let apiEndpoint = window.location.origin;
    this.map.initialize({coordinates, timeRange, apiEndpoint});
  }

  showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopoverComponent, this.filter);
    popover.present({
      ev: $event
    });
  }
}