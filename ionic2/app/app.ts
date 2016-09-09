import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {MapPage} from './pages/map/map';
import { Array } from './app-menu.component';

@Component({
  templateUrl: 'app-menu.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MapPage;
  pages: any = Pages;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.link);
  }
}

ionicBootstrap(App);
