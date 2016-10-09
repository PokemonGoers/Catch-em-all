import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../../models/filter';
import { FilterService } from '../../services/filter.service';

const clone = obj => JSON.parse(JSON.stringify(obj));

@Component({
  template: require('./poke-filter-time-tab.component.html'),
  selector: 'poke-filter-time-tab',
  styles: [require('./poke-filter-time-tab.component.scss')]
})
export class PokeFilterTimeTabComponent implements OnInit {
  @ViewChild('sightingsRangeSlider') sightingsRangeSlider: any;

  sightingsRange: number;
  predictionsRange: number;

  constructor(public filterService: FilterService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.sightingsRange = this.filterService.sightingsRange;
    this.predictionsRange = this.filterService.predictionsRange;

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
    event._checked ? this.sightingsRange = 5 : this.sightingsRange = 9;
    this.filterService.sightingsRange = this.sightingsRange;
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onSightingsRangeChanged(sightingsRange) {
    this.sightingsRange = sightingsRange;
    this.filterService.sightingsRange = this.sightingsRange;
  }

  onPredictionsToggleChanged(event) {
    event._checked ? this.predictionsRange = 5 : this.predictionsRange = 0;
    this.filterService.predictionsRange = this.predictionsRange;
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onPredictionsRangeChanged(predictionsRange) {
    this.predictionsRange = predictionsRange;
    this.filterService.predictionsRange = this.predictionsRange;
  }
}
