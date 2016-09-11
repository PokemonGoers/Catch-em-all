import { ViewChild, AfterViewInit } from '@angular/core';
import { Page, Events, PopoverController } from 'ionic-angular';
import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover.component';
import {MapComponent} from '../../components/map/map.component';

@Page({
  templateUrl: 'pages/map/map.page.html',
  directives: [MapComponent]
})
export class MapPage implements AfterViewInit {

  @ViewChild(MapComponent) map: MapComponent;

  latitude: number;
  longitude: number;
  timeRangeFrom: number;
  timeRangeTo: number;
  apiEndpoint: string;

  filter = {
    time: {
      lower: 0,
      upper: 60
    }
  };

  constructor(private popoverCtrl: PopoverController, public events: Events) {
    events.subscribe('filter:changed:time', (time: Object) => {
      this.filter.time = time[0]
    });

    this.latitude = 48.264673;
    this.longitude = 11.671434;
    this.timeRangeFrom = 0;
    this.timeRangeTo = 60;
    this.apiEndpoint = window.location.origin;
   }

  public showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopoverComponent, this.filter);
    popover.present({
      ev: $event
    });
  }

  ngAfterViewInit() {
    // Ready to interact with this.map
  }
}