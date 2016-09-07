import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapComponent} from '../../components/map/map';

var PokeMap = require('../../../../../PokeMap-2/index.js');

@Component({
  templateUrl: 'pages/map/map.html',
  directives: [MapComponent]
})
export class MapPage implements AfterViewInit {

  @ViewChild(MapComponent) map: MapComponent;

  constructor(private navCtrl: NavController) {
  }

  ngAfterViewInit() {
    // Ready to interact with this.map
  }

}
