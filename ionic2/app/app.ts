import { Component, enableProdMode } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import 'rxjs/add/operator/map';

import { MapPage } from './pages/map/map.page';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';

// Provider
import { ApiService } from './services/api.service';
import { LocationService } from './services/location.service';

declare const BUILD_ENV: string;
declare const BUILD_TIME: string;

if (BUILD_ENV === 'release') {
  console.log('Build time:', BUILD_TIME);
  enableProdMode();
}

@Component({
  template: require('./app.html'),
  directives: [NavSidebarComponent],
  providers: [
    ApiService,
    LocationService
  ]
})

export class App {

  rootPage: any = MapPage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

}

ionicBootstrap(App);
