import { Component } from '@angular/core';
import { PokeFilterTimeTabComponent } from '../poke-filter-time-tab/poke-filter-time-tab.component';
import { FilterPopoverTabPokemon } from '../filter-popover-tab-pokemon/filter-popover-tab-pokemon';
import { Events, ViewController } from 'ionic-angular';

@Component({
  selector: 'filter-popover',
  template: require('./filter-popover.component.html'),
  directives: [PokeFilterTimeTabComponent, FilterPopoverTabPokemon]
})

export class FilterPopoverComponent {

  currentTab = 'time';
  filter: Object;

  constructor(private viewController: ViewController,
              private events: Events) {}

  close(): void {
    this.viewController.dismiss();
  }

  onChange(): void {
    this.events.publish('filter:changed', this.filter)
  }
}
