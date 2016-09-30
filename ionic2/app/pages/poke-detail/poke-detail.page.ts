import { forwardRef } from '@angular/core';
import { Page, NavController, NavParams } from 'ionic-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Pokemon } from '../../models/pokemon';
import { PokeEvolutionsComponent } from '../../components/poke-details/poke-evolutions.component';
import { PokeAttacksComponent } from '../../components/poke-details/poke-attacks.component';
import { PokeTypeComponent } from '../../components/poke-details/poke-type.component';
import { PokeStatsComponent } from '../../components/poke-details/poke-stats.component';

@Page({
  template: require('./poke-detail.page.html'),
  styles: [require('./poke-detail.page.scss')],
  directives: [
    forwardRef(() => NavbarComponent),
    PokeEvolutionsComponent,
    PokeAttacksComponent,
    PokeTypeComponent,
    PokeStatsComponent
  ]
})

export class PokeDetailPage {

  pokemon: Pokemon;

  constructor(private navParams: NavParams) {
    this.pokemon = navParams.get('pokemon');
  }

  getRankInWords() {
    let reverseRank = 152 - this.pokemon.rarityRank;

    if (reverseRank == 1) {
      return "1st";
    } else if (reverseRank == 2) {
      return "2nd";
    } else if (reverseRank == 3) {
      return "3rd";
    } else {
      return reverseRank + "th";
    }
  }

}
