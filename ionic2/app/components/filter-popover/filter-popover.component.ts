import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { PokeFilterTimeTabComponent } from '../poke-filter-time-tab/poke-filter-time-tab.component';
import { PokeFilterPokemonTabComponent } from '../poke-filter-pokemon-tab/poke-filter-pokemon-tab.component';
import { FilterService } from '../../services/filter.service';

@Component({
  // Use inline tamplate: https://github.com/driftyco/ionic/issues/7803
  template: require('./filter-popover.component.html'),
  directives: [
    PokeFilterTimeTabComponent,
    PokeFilterPokemonTabComponent
  ],
  providers: [
    ApiService,
    ConfigService,
    FilterService
  ],
})

export class FilterPopoverComponent {
  currentTab: string;

  constructor(private viewController: ViewController,
              private platform: Platform,
              private params: NavParams) {}

  ionViewWillEnter() {
    this.currentTab = 'time';
  }

  close(): void {
    this.viewController.dismiss();
  }
}
