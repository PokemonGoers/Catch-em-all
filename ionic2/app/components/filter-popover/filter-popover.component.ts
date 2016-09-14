import {Component} from "@angular/core";
import {FilterPopoverTabTime} from "../filter-popover-tab-time/filter-popover-tab-time";
import {FilterPopoverTabPokemon} from "../filter-popover-tab-pokemon/filter-popover-tab-pokemon";

@Component({
  template: `
    <ion-content>
        <div [ngSwitch]="currentTab">
            <ion-toolbar style="padding: 0;">
                <ion-segment>
                    <ion-segment-button value="time" (click)="currentTab = 'time'">Time</ion-segment-button>
                    <ion-segment-button value="pokemon" (click)="currentTab = 'pokemon'">Pokemon</ion-segment-button>
                </ion-segment>
            </ion-toolbar>
          <time-tab *ngSwitchCase="'time'"></time-tab>
          <poke-tab *ngSwitchCase="'pokemon'"></poke-tab>
        </div>
      </ion-content>
    `,
  directives: [FilterPopoverTabTime, FilterPopoverTabPokemon]
})
export class FilterPopoverComponent {
  currentTab = 'time';

  constructor() {
  }
}
