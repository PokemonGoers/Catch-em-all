import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

import { Filter } from '../models/filter';

const clone = obj => JSON.parse(JSON.stringify(obj));

@Injectable()
export class FilterService {

  private _sightingsRange: number = 4;
  private _predictionsRange: number = 5;
  private _pokemonIds: number[] = null;

  private timeRanges = [
    {label: '1m', time: 86400*30},
    {label: '2w', time: 86400*14},
    {label: '1w', time: 86400*7},
    {label: '2d', time: 86400*2},
    {label: '1d', time: 86400},
    {label: '10h', time: 3600*10},
    {label: '5h', time: 3600*5},
    {label: '2h', time: 3600*2},
    {label: '1h', time: 3600},
    {label: 'Now', time: 0},
  ];

  timeRangesSightings: any[];
  timeRangesPredictions: any[];

  constructor(private events: Events, private platform: Platform) {
    this.timeRangesSightings = clone(this.timeRanges);
    this.timeRangesPredictions = clone(this.timeRanges);
    this.timeRangesPredictions.reverse();

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
          NativeStorage.getItem('filter').then(this.loadFilter.bind(this)).catch(error => console.log('ERROR', error))
        }
      );
    }
  }

  private loadFilter(savedFilter) {
    this._sightingsRange = savedFilter.sightingsRange;
    this._predictionsRange = savedFilter.predictionsRange;
    this._pokemonIds = savedFilter.pokemonIds;

    this.onFilterUpdate();
  }

  private dumpFilter() {
    return {
      sightingsRange: this._sightingsRange,
      predictionsRange: this._predictionsRange,
      pokemonIds: this._pokemonIds
    }
  }

  onFilterUpdate() {
    this.events.publish('map:filter', this.filter);

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => NativeStorage.setItem('filter', this.dumpFilter()));
    }
  }

  get filter(): Filter {
    return {
      sightingsSince: this.timeRangesSightings[this._sightingsRange].time,
      predictionsUntil: this.timeRangesPredictions[this._predictionsRange].time,
      pokemonIds: this._pokemonIds
    }
  }

  get sightingsSince(): number {
    return this.timeRangesSightings[this._sightingsRange];
  }

  get sightingsRange(): number {
    return this._sightingsRange;
  }

  set sightingsRange(sightingsRange: number) {
    this._sightingsRange = sightingsRange;
    this.onFilterUpdate();
  }

  get predictionsUntil(): number {
    return this.timeRangesPredictions[this._predictionsRange];
  }

  get predictionsRange(): number {
    return this._predictionsRange;
  }

  set predictionsRange(predictionsRange: number) {
    this._predictionsRange = predictionsRange;
    this.onFilterUpdate();
  }

  get pokemonIds(): number[] {
    return this._pokemonIds;
  }

  set pokemonIds(pokemonIds: number[]) {
    this._pokemonIds = pokemonIds;
    this.onFilterUpdate();
  }
}
