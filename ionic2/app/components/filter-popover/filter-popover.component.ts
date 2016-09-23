import { Component } from '@angular/core';
import { PokeFilterTimeTabComponent } from '../poke-filter-time-tab/poke-filter-time-tab.component';
import { PokeFilterPokemonTabComponent } from '../poke-filter-pokemon-tab/poke-filter-pokemon-tab.component';
import { Events, ViewController } from 'ionic-angular';
import { Pokemon } from '../../models/pokemon';
import { Filter } from '../../models/filter';

@Component({
  template: require('./filter-popover.component.html'),
  directives: [PokeFilterTimeTabComponent, PokeFilterPokemonTabComponent]
})

export class FilterPopoverComponent {
  currentTab: string;
  filter: Filter;

  constructor(private viewController: ViewController,
              private events: Events) {}

  ionViewWillEnter() {
    this.currentTab = 'time';
    this.filter = {
      sightingsRange: 7,
      predictionsRange: 5,
      selectedPokemon: []
    }
  }

  onFilterChanged(filter) {
    this.filter = filter;
  }

  close(): void {
    this.viewController.dismiss();
  }

  onChange(): void {
    this.events.publish('filter:changed', this.filter)
  }
}
