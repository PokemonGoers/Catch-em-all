import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search.page';

@Component({
  template: require('./navbar.component.html'),
  selector: 'navbar'
})

export class NavbarComponent {

  constructor(private navCtr: NavController) {}

  launchSearchPage() {
    this.navCtr.push(SearchPage);
  }

}
