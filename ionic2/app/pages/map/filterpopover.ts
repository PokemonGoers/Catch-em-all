import { Component } from '@angular/core';
import { Events, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'pages/map/filterpopover.html'
})
export class FilterPopover {

  time: {lower: number, upper: number}
  locationRadius: number

  constructor(private viewCtrl: ViewController, public events: Events) {}

  close() {
    this.viewCtrl.dismiss();
  }

  onChange() {
    this.events.publish('filter:changed', {
      time: this.time,
      locationRadius: this.locationRadius
    })
  }
}
