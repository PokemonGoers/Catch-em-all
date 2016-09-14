import { forwardRef } from '@angular/core';
import { Page, NavController } from 'ionic-angular';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PEOPLE } from './about-people';

@Page({
  template: require('./about.page.html'),
  styles: [require('./about.page.scss')],
  directives: [forwardRef(() => NavbarComponent)]
})
export class AboutPage {
  people: Object

  constructor() {
      this.people = PEOPLE;
  }

}
