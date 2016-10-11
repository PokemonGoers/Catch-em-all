import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { PokeFilterTimeTabComponent } from '../poke-filter-time-tab/poke-filter-time-tab.component';
import { PokeFilterPokemonTabComponent } from '../poke-filter-pokemon-tab/poke-filter-pokemon-tab.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'poke-filter-popover',
  template: require('./poke-filter-popover.component.html'),
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

export class PokeFilterPopoverComponent {
  currentTab: string;

  constructor(private viewController: ViewController) {}

  ionViewWillEnter() {
    this.currentTab = 'time';
  }

  close(): void {
    this.viewController.dismiss();
  }
}
