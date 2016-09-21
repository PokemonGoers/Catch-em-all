import { Component } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { PokeFilterTimeTabComponent } from '../poke-filter-time-tab/poke-filter-time-tab.component';
import { FilterPopoverTabPokemon } from '../filter-popover-tab-pokemon/filter-popover-tab-pokemon';
import { Events, ViewController } from 'ionic-angular';
import { Pokemon } from '../../models/pokemon';
import { Filter } from '../../models/filter';

@Component({
  template: require('./filter-popover.component.html'),
  directives: [PokeFilterTimeTabComponent, FilterPopoverTabPokemon]
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
