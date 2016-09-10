import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { FilterPopover } from './filterpopover/filterpopover'

@Component({
  templateUrl: 'pages/map/map.html'
})
export class MapPage {

  constructor(private popoverCtrl: PopoverController) { }

  showFilterPopover($event?): void {
    let popover = this.popoverCtrl.create(FilterPopover, this.filter);
    popover.present({
      ev: $event
    });
  }
}
