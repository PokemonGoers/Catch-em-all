import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapComponent} from '../../components/map/map.component';

@Component({
  templateUrl: 'pages/map/map.html',
  directives: [MapComponent]
})
export class MapPage implements AfterViewInit {

  @ViewChild(MapComponent) map: MapComponent;

  latitude: number;
  longitude: number;
  timeRangeFrom: number;
  timeRangeTo: number;
  apiEndpoint: string;

  constructor(private navCtrl: NavController) {
    this.latitude = 48.264673;
    this.longitude = 11.671434;
    this.timeRangeFrom = 0;
    this.timeRangeTo = 60;
    this.apiEndpoint = window.location.origin;
  }

  ngAfterViewInit() {
    // Ready to interact with this.map
  }

}
