import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapComponent} from '../../components/map/map.component';

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
