import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../../pages/search/search.page';

@Component({
  selector: 'poke-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent {

  constructor(private navCtr: NavController) { }

  launchSearchPage() {
    this.navCtr.push(SearchPage);
  }

}
