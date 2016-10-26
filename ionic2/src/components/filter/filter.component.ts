import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'poke-filter',
  templateUrl:  './filter.component.html'
})
export class FilterComponent {
  currentTab: string = 'time';

  constructor(private viewController: ViewController) { }

  close(): void {
    this.viewController.dismiss();
  }
}
