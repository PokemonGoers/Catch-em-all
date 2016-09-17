import { Component, Input } from '@angular/core';
import { Nav } from 'ionic-angular';
import { MapPage } from '../../pages/map/map.page';
import { AboutPage } from '../../pages/about/about.page';
import { ImprintPage } from '../../pages/imprint/imprint.page';
import { WikiIndexPage } from "../../pages/wiki-index/wiki-index.page";

@Component({
  selector: 'nav-sidebar',
  template: require('./nav-sidebar.component.html'),
  styles: [require('./nav-sidebar.component.scss')]
})
export class NavSidebarComponent {

  @Input() content: Nav;

  pages = [
    {name: 'PokeMap', link: MapPage},
    {name: 'Wiki', link: WikiIndexPage},
    {name: 'About', link: AboutPage},
    {name: 'Imprint & Disclaimer', link: ImprintPage}
  ];

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.content.setRoot(page.link);
  }

}
