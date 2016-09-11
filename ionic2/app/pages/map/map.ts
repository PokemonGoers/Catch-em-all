import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Navbar } from '../../components/navbar/navbar.component';

@Component({
  templateUrl: 'pages/map/map.html',
  directives: [Navbar]
})
export class MapPage {

  constructor(private navCtrl: NavController) {

  }

}
