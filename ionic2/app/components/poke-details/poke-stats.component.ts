import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./poke-stats.component.html'),
  styles: [require('./poke-stats.component.scss')],
  selector: 'poke-stats'
})

export class PokeStatsComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() {
  }

  ngOnInit() {
    this.pokemon.fleeRate *= 100;
  }

}
