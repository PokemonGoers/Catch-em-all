import { Component, Input } from '@angular/core';

import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'poke-stats',
  template: require('./stats.component.html'),
  styles: [require('./stats.component.scss')]
})
export class StatsComponent {
  @Input() pokemon: Pokemon;

  constructor() { }

}
