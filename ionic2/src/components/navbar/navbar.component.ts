import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../../pages/search/search.page';

@Component({
  selector: 'poke-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @Input() title: string;

  constructor(private navCtr: NavController) { }

  launchSearchPage() {
    this.navCtr.push(SearchPage);
  }

}
