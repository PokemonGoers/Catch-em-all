import { forwardRef } from '@angular/core';
import { Page, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { Pokemon } from "../../models/pokemon";
import { PokeEvolutionComponent } from "../../components/poke-details/poke-evolution.component";

@Page({
  templateUrl: 'pages/pokedetail/pokedetail.page.html',
  directives: [PokeEvolutionComponent],
})
export class PokeDetailPage {

  pokemonId: number;
  pokemon: Pokemon;

  constructor(private navCtrl: NavController, navParams: NavParams, private apiservice: ApiService) {
    this.pokemonId = navParams.get('pokemonId');
    this.apiservice.getPokemonById(this.pokemonId).subscribe(results => this.pokemon = results, error => this.pokemon = null);
  }

}
