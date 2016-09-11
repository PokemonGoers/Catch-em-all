import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Navbar } from '../../components/navbar/navbar.component';

@Component({
  templateUrl: 'pages/wiki/wiki.html',
  directives: [Navbar]
})
export class WikiPage {

  constructor(private navCtrl: NavController) {

  }
}
