import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import 'rxjs/add/operator/map';

import { MapPage } from '../pages/map/map.page';

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage = MapPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
