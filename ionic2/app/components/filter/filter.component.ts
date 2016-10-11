import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { FilterTimeTabComponent } from '../filter-time-tab/filter-time-tab.component';
import { FilterPokemonTabComponent } from '../filter-pokemon-tab/filter-pokemon-tab.component';
import { FilterService } from '../../services/filter.service';

@Component({
  // Use inline tamplate: https://github.com/driftyco/ionic/issues/7803
  template: `
    <ion-toolbar style="padding: 0;">
      <ion-segment [(ngModel)]="currentTab" primary>
        <ion-segment-button value="time">Time</ion-segment-button>
        <ion-segment-button value="pokemon">Pokemon</ion-segment-button>
      </ion-segment>
    </ion-toolbar>
    <div [ngSwitch]="currentTab">
      <poke-filter-time-tab *ngSwitchCase="'time'"></poke-filter-time-tab>
      <poke-filter-pokemon-tab *ngSwitchCase="'pokemon'"></poke-filter-pokemon-tab>
    </div>
    `,
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
