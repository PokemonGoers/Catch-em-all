import {Component} from "@angular/core";
import {FilterPopoverTabTime} from "../filter-popover-tab-time/filter-popover-tab-time";
import {FilterPopoverTabPokemon} from "../filter-popover-tab-pokemon/filter-popover-tab-pokemon";

@Component({
  template: `
      <ion-list>
        <ion-list-header>Filter</ion-list-header>
          <div [ngSwitch]="currentTab">
            <button ion-item (click)="currentTab = 'time'">
              Time
            </button>
            <time-tab *ngSwitchCase="'time'"></time-tab>
            
            <button ion-item (click)="currentTab = 'pokemon'">
              Pokemon
            </button>
            <poke-tab *ngSwitchCase="'pokemon'"></poke-tab>
          </div>
      </ion-list>
    `,
  directives: [FilterPopoverTabTime, FilterPopoverTabPokemon]
})
export class FilterPopoverComponent {
  currentTab = 'time';

  constructor() {
  }
}
