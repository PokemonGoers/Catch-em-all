import { forwardRef } from '@angular/core';
import { Page, Events, PopoverController, NavParams } from 'ionic-angular';
import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Page({
  templateUrl: 'pages/map/map.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class MapPage {
  filter = {
    time: {
      lower: 0,
      upper: 60
    }
  };

  latitude: number;
  longitude: number;

  constructor(private popoverCtrl: PopoverController, events: Events, navParams: NavParams) {
    events.subscribe('filter:changed:time', (time: Object) => {
      this.filter.time = time[0]
    });

    this.latitude = navParams.get('latitude');
    this.longitude = navParams.get('longitude');
   }

  public showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopoverComponent, this.filter);
    popover.present({
      ev: $event
    });
  }
}