import { forwardRef } from '@angular/core';
import { Page, NavController } from 'ionic-angular';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PEOPLE } from './about-people';

@Page({
  templateUrl: 'pages/about/about.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class AboutPage {
  people: Object

  constructor() {
      this.people = PEOPLE;
  }

}
