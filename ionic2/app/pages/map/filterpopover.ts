import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'pages/map/filterpopover.html'
})
export class FilterPopover {

  constructor(private viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }

}
