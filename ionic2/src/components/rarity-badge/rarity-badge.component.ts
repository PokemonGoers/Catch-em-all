import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-rarity-badge',
  templateUrl: './rarity-badge.component.html'
})
export class RarityBadgeComponent {

  @Input() rarity: number;

  constructor() { }

}
