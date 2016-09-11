import { Component, enableProdMode } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import 'rxjs/add/operator/map';

import { MapPage } from "./pages/map/map.page";
import { ApiService } from './services/api.service';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';

declare const ENV: string;

if (ENV === 'prod') {
  enableProdMode();
}

@Component({
  templateUrl: 'app.html',
  providers: [ApiService],
  directives: [NavSidebarComponent]
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
