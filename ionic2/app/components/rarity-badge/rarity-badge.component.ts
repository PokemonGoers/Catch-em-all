import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-rarity-badge',
  template: require('./rarity-badge.component.html'),
  styles: [require('./rarity-badge.component.scss')]
})
export class RarityBadgeComponent {

  @Input() rarity: number;

  constructor() { }

}
