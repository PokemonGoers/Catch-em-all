import { Component } from '@angular/core';
import {Events, ViewController, NavParams} from 'ionic-angular';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { PokeFilterTimeTabComponent } from '../poke-filter-time-tab/poke-filter-time-tab.component';
import { PokeFilterPokemonTabComponent } from '../poke-filter-pokemon-tab/poke-filter-pokemon-tab.component';

@Component({
  template: `
    <ion-toolbar style="padding: 0;">
      <ion-segment [(ngModel)]="currentTab" primary>
        <ion-segment-button value="time">Time</ion-segment-button>
        <ion-segment-button value="pokemon">Pokemon</ion-segment-button>
      </ion-segment>
    </ion-toolbar>
    <div [ngSwitch]="currentTab">
      <poke-filter-time-tab *ngSwitchCase="'time'" 
        [filter]="filter" 
        (onFilterChange)="onFilterChanged(filter)">     
      </poke-filter-time-tab>
      <poke-filter-pokemon-tab *ngSwitchCase="'pokemon'"
        [filter]="filter"
        (onFilterChange)="onFilterChanged(filter)">
      </poke-filter-pokemon-tab>
    </div>
    `,
  directives: [
    PokeFilterTimeTabComponent,
    PokeFilterPokemonTabComponent
  ],
  providers: [
    ApiService,
    ConfigService
  ],
})

export class FilterPopoverComponent {
  currentTab: string;
  filter: Filter;

  constructor(private viewController: ViewController,
              private navParams: NavParams,
              private events: Events) { }

  ionViewWillEnter() {
    this.currentTab = 'time';
    this.filter = this.navParams.get('filter');
  }

  onFilterChanged(filter: Filter) {
    this.filter = new Filter(filter.sightingsRange, filter.predictionsRange, filter.selectedPokemon);
    this.events.publish('filter:changed', this.filter);
  }

  close(): void {
    this.viewController.dismiss();
  }
}
