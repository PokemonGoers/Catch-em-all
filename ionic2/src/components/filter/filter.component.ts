import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'poke-filter',
  templateUrl:  './filter.component.html'
})
export class FilterComponent {
  currentTab: string;

  constructor(private viewController: ViewController) { }

  ionViewWillEnter() {
    this.currentTab = 'time';
  }

  close(): void {
    this.viewController.dismiss();
  }
}
