import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search.page';

@Component({
  templateUrl: 'components/navbar/navbar.component.html',
  selector: 'navbar'
})
export class Navbar {

  constructor(private navCtr: NavController) {}

  launchSearchPage() {
    this.navCtr.push(SearchPage);
  }

}
