import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { FilterTimeTabComponent } from '../filter-time-tab/filter-time-tab.component';
import { FilterPokemonTabComponent } from '../filter-pokemon-tab/filter-pokemon-tab.component';
import { FilterService } from '../../services/filter.service';

@Component({
  template:  require('./filter.component.html'),
  directives: [
    FilterTimeTabComponent,
    FilterPokemonTabComponent
  ],
  providers: [
    ApiService,
    ConfigService,
    FilterService
  ],
})

export class FilterComponent {
  currentTab: string;

  constructor(private viewController: ViewController) {}

  ionViewWillEnter() {
    this.currentTab = 'time';
  }

  close(): void {
    this.viewController.dismiss();
  }
}
