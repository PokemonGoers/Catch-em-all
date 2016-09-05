import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Searchbar} from "../../components/searchbar/searchbar";

@Component({
  templateUrl: 'pages/map/map.html',
  directives: [Searchbar]
})
export class MapPage {

  constructor(private navCtrl: NavController) {

  }

}
