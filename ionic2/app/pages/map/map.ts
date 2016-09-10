import { Component } from '@angular/core';
import { Events, PopoverController } from 'ionic-angular';
import { FilterPopover } from '../../components/filter-popover/filter-popover';

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
    

  constructor(private popoverCtrl: PopoverController, public events: Events) {
    events.subscribe('filter:changed:time', (time: Object) => {
      this.filter.time = time[0]
    })
   }

  public showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopover, this.filter);
    popover.present({
      ev: $event
    });
  }
}