import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./rarity-badge.component.html'),
  styles: [require('./rarity-badge.component.scss')],
  selector: 'poke-rarity-badge'
})

export class RarityBadgeComponent {

  @Input() rarity: number;

  constructor() { }

}
