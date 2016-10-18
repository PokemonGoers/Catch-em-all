import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-rarity-badge',
  templateUrl: './rarity-badge.component.html',
  styleUrl: './rarity-badge.component.scss'
})
export class RarityBadgeComponent {

  @Input() rarity: number;

  constructor() { }

}
