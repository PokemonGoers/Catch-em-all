import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tab,  } from 'ionic-angular';

@Component({
  template: require('./poke-filter-time-tab.component.html'),
  selector: 'poke-filter-time-tab',
  styles: [require('./poke-filter-time-tab.component.scss')]
})
export class PokeFilterTimeTabComponent implements OnInit {
  @ViewChild('sightingsRange') _sightingsRange: any;
  sightingsRangeValue: number;
  areSightingsShown: boolean;
  predictionsRangeValue: number;
  arePredictionsShown: boolean;

  constructor() {}

  ngOnInit() {
    // Inverted coloring for sightings bar: Replace method that does coloring
    this._sightingsRange.updateBar = function () {
      let firstRatio = this._knobs.first.ratio;
      this._barL = `${firstRatio * 100}%`;
      this._barR = `0%`;
      this.updateTicks();
    }
    setTimeout(() => this._sightingsRange.updateBar(), 0) // Hack: Async call
  }

  onSightingsRangeChange() {
    this.areSightingsShown = this.sightingsRangeValue !== 9;
  }

  onSightingsToggleChange(toggle) {
    this.sightingsRangeValue = toggle.checked ? 4 : 9; // '1d' or 'off'
  }

  onPredictionsRangeChange() {
    this.arePredictionsShown = this.predictionsRangeValue !== 0;
  }

  onPredictionsToggleChange(toggle) {
    this.predictionsRangeValue = toggle.checked ? 5 : 0; // '1d' or 'off'
  }
}
