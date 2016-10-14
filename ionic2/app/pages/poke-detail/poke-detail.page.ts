import { forwardRef } from '@angular/core';
import { Page, NavParams } from 'ionic-angular';

import { Pokemon } from '../../models/pokemon';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EvolutionsComponent } from '../../components/evolutions/evolutions.component';
import { AttacksComponent } from '../../components/attacks/attacks.component';
import { TypesComponent } from '../../components/types/types.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { RarityBadgeComponent } from '../../components/rarity-badge/rarity-badge.component';
import { TweetsComponent } from '../../components/tweets/tweets.component';

@Page({
  template: require('./poke-detail.page.html'),
  styles: [require('./poke-detail.page.scss')],
  directives: [
    forwardRef(() => NavbarComponent),
    EvolutionsComponent,
    AttacksComponent,
    TypesComponent,
    StatsComponent,
    RarityBadgeComponent,
    TweetsComponent
  ]
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
