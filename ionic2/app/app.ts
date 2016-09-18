import { Component, enableProdMode } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import 'rxjs/add/operator/map';

import { MapPage } from "./pages/map/map.page";
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import globals from './globals';

// Provider
import { ApiService } from './services/api.service';
import { LocationService } from './services/location.service';
import { ConfigService } from './services/config.service';

console.log('BUILD_ENV', globals.BUILD_ENV);
console.log('BUILD_TIME', globals.BUILD_TIME);
console.log('BUILD_TARGET', globals.BUILD_TARGET);
console.log('API_ENDPOINT', globals.API_ENDPOINT);

if (globals.BUILD_ENV === 'release') {
  enableProdMode();
}

@Component({
  template: require('./app.html'),
  directives: [NavSidebarComponent],
  providers: [
    ApiService,
    LocationService,
    ConfigService
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
