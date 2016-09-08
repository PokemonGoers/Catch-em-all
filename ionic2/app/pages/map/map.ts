import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { FilterPopover } from './FilterPopover';

@Component({
  templateUrl: 'pages/map/map.html'
})
export class MapPage {

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController) { }

  public toggleFilterPopover($event) {
    let popover = this.popoverCtrl.create(FilterPopover);
    popover.present({
      ev: $event
    });
  }
}
