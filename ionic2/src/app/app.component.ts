import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import 'rxjs/add/operator/map';

import { MapPage } from '../pages/map/map.page';
import { NotificationService } from '../services/notification.service';

@Component({
  templateUrl: './app.html'
})
export class App {
  rootPage = MapPage;

  @ViewChild('content') nav: Nav;

  constructor(private platform: Platform, private notificationService: NotificationService) {
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        StatusBar.styleDefault();
      }

      if (platform.is('android')) {
        notificationService.setNav(this.nav);
        notificationService.scheduleNotifications();
      }
    });
  }
}
