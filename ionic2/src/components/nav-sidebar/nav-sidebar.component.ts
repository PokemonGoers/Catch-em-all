import { Component, Input } from '@angular/core';
import { Nav } from 'ionic-angular';

import { MapPage } from '../../pages/map/map.page';
import { AboutPage } from '../../pages/about/about.page';
import { ImprintPage } from '../../pages/imprint/imprint.page';
import { WikiIndexPage } from '../../pages/wiki-index/wiki-index.page';

@Component({
  selector: 'poke-nav-sidebar',
  templateUrl: './nav-sidebar.component.html'
})
export class NavSidebarComponent {

  @Input() content: Nav;

  pages = [
    {name: 'PokeMap', link: MapPage},
    {name: 'PokeDex', link: WikiIndexPage},
    {name: 'About', link: AboutPage},
    {name: 'Disclaimer', link: ImprintPage}
  ];

  constructor() { }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.content.setRoot(page.link);
  }

}
