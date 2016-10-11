import { Component, Input, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'poke-stats',
  template: require('./stats.component.html'),
  styles: [require('./stats.component.scss')]
})
export class StatsComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit() {
    this.pokemon.fleeRate *= 100;
  }

}
