import { Component, Input } from '@angular/core';
import { Nav } from 'ionic-angular';
import { MapPage } from '../../pages/map/map.page';
import { WikiPage } from '../../pages/pokedetail/pokedetail.page';
import { AboutPage } from '../../pages/about/about.page';
import { ImprintPage } from '../../pages/imprint/imprint.page';

@Component({
  selector: 'nav-sidebar',
  templateUrl: 'components/nav-sidebar/nav-sidebar.component.html'
})
export class NavSidebarComponent {

  @Input() content: Nav;

  pages = [
    {name: 'PokeMap', link: MapPage},
    {name: 'Wiki', link: WikiPage},
    {name: 'About', link: AboutPage},
    {name: 'Imprint & Disclaimer', link: ImprintPage}
  ];

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.content.setRoot(page.link);
  }

}
