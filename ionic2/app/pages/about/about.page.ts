import { forwardRef } from '@angular/core';
import { Page, NavController } from 'ionic-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Page({
  templateUrl: 'pages/about/about.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class AboutPage {

  constructor(private navCtrl: NavController) {

  }

}
