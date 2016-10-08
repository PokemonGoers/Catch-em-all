import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./poke-rarity-badge.component.html'),
  styles: [require('./poke-rarity-badge.component.scss')],
  selector: 'poke-rarity-badge'
})

export class PokeRarityBadgeComponent {

  @Input() rarity: number;

  constructor() { }

}
