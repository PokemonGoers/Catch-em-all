import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./poke-stats.component.html'),
  styles: [require('./poke-stats.component.scss')],
  selector: 'poke-stats'
})

export class PokeStatsComponent {

  @Input('pokemon') pokemon: Pokemon;

  constructor() {}

}
