import {Component} from "@angular/core";
import {FilterPopoverTabTime} from "../filter-popover-tab-time/filter-popover-tab-time";
import {FilterPopoverTabPokemon} from "../filter-popover-tab-pokemon/filter-popover-tab-pokemon";
import {Events, ViewController} from "ionic-angular";

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
  filter: Object;

  constructor(private viewController: ViewController, private events: Events) {
  }

  close(): void {
    this.viewController.dismiss();
  }

  onChange(): void {
    this.events.publish('filter:changed', this.filter)
  }
}
