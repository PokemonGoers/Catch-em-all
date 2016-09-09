import { Component } from '@angular/core';
import { Events, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'pages/map/filterpopover/filterpopover.html'
})
export class FilterPopover {
  time: {lower: number, upper: number}

  constructor(private viewCtrl: ViewController, private params: NavParams, public events: Events) {
    this.time = params.data.time || params.data[0].time
   }

  private close(): void {
    this.viewCtrl.dismiss();
  }

  private onChange(): void {
    this.events.publish('filter:changed:time', this.time)
  }
}
