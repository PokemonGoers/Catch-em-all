import { Component } from '@angular/core';
import { Events, NavParams, ViewController } from 'ionic-angular';

@Component({
  template: `
  <ion-list style="margin-bottom: 0">
    <ion-list-header>Time (days):</ion-list-header>
    <ion-item>
      <ion-range 
          dualKnobs="true" 
          [(ngModel)]="time" 
          (ionChange)="onChange()" 
          min="0" 
          max="31" 
          step="1"
          pin="true" 
          debounce="500">
      </ion-range>
    </ion-item>
</ion-list>`
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
