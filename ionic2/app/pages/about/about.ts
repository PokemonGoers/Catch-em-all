import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  templateUrl: 'pages/about/about.html',
  directives: [Navbar]
})
export class AboutPage {
  constructor(private navCtrl: NavController) {

  }
}
