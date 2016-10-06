import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./poke-rarity-badge.component.html'),
  styles: [require('./poke-rarity-badge.component.scss')],
  selector: 'poke-rarity-badge'
})

export class PokeRarityBadgeComponent {

  @Input() pokemon: Pokemon;

  getPokemonRarityStars() {
    let inHundred = this.pokemon.appearanceLikelihood * 100;

    if (inHundred < 1) {
      let inThousand = inHundred * 10;
      if (inThousand < 1) {
        return [0, 0, 0];
      } else {
        return [0, 0];
      }
    } else {
      return [0];
    }    
  }

}
