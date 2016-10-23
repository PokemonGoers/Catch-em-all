import { Injectable } from '@angular/core';
import { Nav } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

import { Mob } from '../models/mob';
import { MapPage } from '../pages/map/map.page';
import { ApiService } from './api.service';

@Injectable()
export class NotificationService {

  private MOB_NOTIFICATION_ID = 1;
  private MOB_ZOOM_LEVEL = 15;

  private nav: Nav;

  constructor(private apiService: ApiService) {}

  setNav(nav: Nav) {
    this.nav = nav;
  }

  scheduleNotifications() {
    this.apiService.subscribeToMobs(this.showMobNotification.bind(this));

    LocalNotifications.on('click', notification => {
      switch(notification.id) {
        case this.MOB_NOTIFICATION_ID:
          this.onMobNotificationClick(JSON.parse(notification.data));
          break;
      }
    });
  }

  showMobNotification(mob: Mob) {
    // https://github.com/katzer/cordova-plugin-local-notifications/wiki/04.-Scheduling
    LocalNotifications.schedule({
      id: this.MOB_NOTIFICATION_ID,
      title: 'PredictEmAll - PokeMob detected',
      text: mob.tweets.length + ' persons in your area are tweeting about Pokemon',
      icon: 'res://icon.png',
      smallIcon: 'res://icon.png',
      data: mob
    });
  }

  onMobNotificationClick(mob: Mob) {
    let parameters: any = {};
    parameters.position = {
      coordinates: {
        latitude: mob.coordinates[1],
        longitude: mob.coordinates[0]
      },
      zoomLevel: this.MOB_ZOOM_LEVEL
    };

    this.nav.setRoot(MapPage, parameters);
  }

}
