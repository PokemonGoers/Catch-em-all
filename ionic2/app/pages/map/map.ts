import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { FilterPopover } from './filterpopover';

@Component({
  templateUrl: 'pages/map/map.html'
})
export class MapPage {

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, public events: Events) {
    events.subscribe('filter:changed', (data) => {
      console.log(data)
    })
   }

  public toggleFilterPopover($event) {
    let popover = this.popoverCtrl.create(FilterPopover);
    popover.present({
      ev: $event
    });
  }
}
