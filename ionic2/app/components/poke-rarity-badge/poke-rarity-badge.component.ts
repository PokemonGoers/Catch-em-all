import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'poke-rarity-badge',
  template: require('./poke-rarity-badge.component.html')
})

export class PokeRarityBadgeComponent {

  @Input() rarity: number;

  constructor() { }

}
