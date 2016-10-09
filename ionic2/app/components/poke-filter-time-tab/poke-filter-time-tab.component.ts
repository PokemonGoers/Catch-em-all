import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../../models/filter';
import { FilterService } from '../../services/filter.service';

@Component({
  template: require('./poke-filter-time-tab.component.html'),
  selector: 'poke-filter-time-tab',
  styles: [require('./poke-filter-time-tab.component.scss')]
})
export class PokeFilterTimeTabComponent implements OnInit {
  @ViewChild('sightingsRangeSlider') sightingsRangeSlider: any;

  sightingsRange: number;
  predictionsRange: number;

  constructor(public filter: FilterService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Inverted coloring for sightings bar: Replace method that does coloring
    this.sightingsRangeSlider.updateBar = function () {
      let firstRatio = this._knobs.first.ratio;
      this._barL = `${firstRatio * 100}%`;
      this._barR = `0%`;
      this.updateTicks();
    };
    setTimeout(() => this.sightingsRangeSlider.updateBar(), 0); // Hack: Async call
  }

  onSightingsToggleChanged(event) {
    event._checked ? this.filter.sightingsRange = 5 : this.filter.sightingsRange = 9;
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onSightingsRangeChanged(sightingsRange) {
    this.filter.sightingsRange = sightingsRange;
  }

  onPredictionsToggleChanged(event) {
    event._checked ? this.filter.predictionsRange = 5 : this.filter.predictionsRange = 0;
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onPredictionsRangeChanged(predictionsRange) {
    this.filter.predictionsRange = predictionsRange;
  }
}
