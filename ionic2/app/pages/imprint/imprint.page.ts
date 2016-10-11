import { forwardRef } from '@angular/core';
import { Page } from 'ionic-angular';

import { NavbarComponent } from '../../components/navbar/navbar.component';

@Page({
  template: require('./imprint.page.html'),
  styles: [require('../about/about.page.scss')],
  directives: [forwardRef(() => NavbarComponent)]
})
export class ImprintPage {

  constructor() { }

}
