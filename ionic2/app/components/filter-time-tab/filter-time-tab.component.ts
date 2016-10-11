import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../../models/filter';
import { FilterService } from '../../services/filter.service';

@Component({
  template: require('./filter-time-tab.component.html'),
  selector: 'poke-filter-time-tab',
  styles: [require('./filter-time-tab.component.scss')]
})
export class FilterTimeTabComponent implements OnInit {
  @ViewChild('sightingsRangeSlider') sightingsRangeSlider: any;

  sightingsRange: number;
  predictionsRange: number;

  constructor(public filterService: FilterService, private cdr: ChangeDetectorRef) {}

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
    event._checked ? this.filterService.sightingsRange = 5 : this.filterService.sightingsRange = 9;
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onSightingsRangeChanged(sightingsRange) {
    this.filterService.sightingsRange = sightingsRange;
  }

  onPredictionsToggleChanged(event) {
    event._checked ? this.filterService.predictionsRange = 5 : this.filterService.predictionsRange = 0;
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onPredictionsRangeChanged(predictionsRange) {
    this.filterService.predictionsRange = predictionsRange;
  }
}
