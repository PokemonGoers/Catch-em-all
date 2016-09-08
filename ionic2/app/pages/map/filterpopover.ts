import { Component } from '@angular/core';
import { Events, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'pages/map/filterpopover.html'
})
export class FilterPopover {
  time: {lower: number, upper: number}
  locationRadius: number

  constructor(private viewCtrl: ViewController, public events: Events) {
    this.time = {
      lower: 0,
      upper: 7
    }
    this.locationRadius = 1000
  }

  private close(): void {
    this.viewCtrl.dismiss();
  }

  private onChange(): void {
    this.events.publish('filter:changed', {
      time: this.time,
      locationRadius: this.locationRadius
    })
  }
}
