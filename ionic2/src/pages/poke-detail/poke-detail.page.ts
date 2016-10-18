import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Pokemon } from '../../models/pokemon';

@Component({
  templateUrl: './poke-detail.page.html'
})
export class PokeDetailPage {

  pokemon: Pokemon;

  constructor(private navParams: NavParams) {
    this.pokemon = navParams.get('pokemon');
  }

  getRankInWords() {
    let reverseRank = 152 - this.pokemon.rarityRank;
    return this.ordinalSuffixOf(reverseRank);
  }

  getAppearanceLikelihoodInWords() {
    let inHundred = this.pokemon.appearanceLikelihood * 100;
    if (inHundred < 1) {
      let inThousand = inHundred * 10;
      if (inThousand < 1) {
        return '<1 in every 1000';
      } else {
        return 'About ' + inThousand.toFixed(0) + ' in every 1000';
      }
    } else {
      return 'About ' + inHundred.toFixed(0) + ' in every 100';
    }
  }

  // Source: http://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586#13627586
  ordinalSuffixOf(i) {
    let j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + 'st';
    }
    if (j == 2 && k != 12) {
      return i + 'nd';
    }
    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  }

}
