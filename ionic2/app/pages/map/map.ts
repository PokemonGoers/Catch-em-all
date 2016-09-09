import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { FilterPopover } from './filterpopover/filterpopover';

@Component({
  templateUrl: 'pages/map/map.html'
})
export class MapPage {

    filter = {
      time: {
        lower: 0,
        upper: 7
      }
    }
    

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, public events: Events) {
    events.subscribe('filter:changed', (filter) => {
      this.filter = filter
    })
   }

  public toggleFilterPopover($event): void {
    let popover = this.popoverCtrl.create(FilterPopover, this.filter);
    popover.present({
      ev: $event
    });
  }
}
