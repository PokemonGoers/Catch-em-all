import { Component, Input } from '@angular/core';
import { Nav } from 'ionic-angular';

import { MapPage } from '../../pages/map/map';
import { WikiPage } from '../../pages/wiki/wiki';
import { AboutPage } from '../../pages/about/about';

@Component({
  selector: 'nav-sidebar',
  templateUrl: 'components/nav-sidebar/nav-sidebar.component.html'
})
export class NavSidebar {

  @Input() content: Nav;

  pages = [
    {name: 'Map', link: MapPage},
    {name: 'Wiki', link: WikiPage},
    {name: 'About',link: AboutPage}
  ];

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.content.setRoot(page.link);
  }

}
