import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Filter } from '../../models/filter';

@Component({
  template: require('./poke-filter-time-tab.component.html'),
  selector: 'poke-filter-time-tab',
  styles: [require('./poke-filter-time-tab.component.scss')]
})
export class PokeFilterTimeTabComponent implements OnInit {
  @ViewChild('sightingsRange') _sightingsRange: any;
  @Input() filter: Filter;
  @Output() onFilterChange = new EventEmitter<Filter>();

  constructor(private cdr: ChangeDetectorRef) {}

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

  onSightingsToggleChanged(event) {
    event._checked ? this.filter.sightingsRange = 5 : this.filter.sightingsRange = 9;
    this.onFilterChange.emit(this.filter);
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onSightingsRangeChanged(event) {
    this.filter.sightingsRange = event.value;
    this.onFilterChange.emit(this.filter);
  }

  onPredictionsToggleChanged(event) {
    event._checked ? this.filter.predictionsRange = 5 : this.filter.predictionsRange = 0;
    this.onFilterChange.emit(this.filter);
    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  onPredictionsRangeChanged(event) {
    this.filter.predictionsRange = event.value;
    this.onFilterChange.emit(this.filter);
  }
}
