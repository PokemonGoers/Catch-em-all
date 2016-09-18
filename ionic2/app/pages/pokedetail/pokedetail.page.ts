import { Page, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { Pokemon } from "../../models/pokemon";
import { PokeEvolutionsComponent } from "../../components/poke-details/poke-evolutions.component";
import { PokeAttacksComponent } from "../../components/poke-details/poke-attacks.component";

@Page({
  templateUrl: 'pages/pokedetail/pokedetail.page.html',
  directives: [
    PokeEvolutionsComponent,
    PokeAttacksComponent,
  ],
})

export class PokeDetailPage {

  pokemonId: number;
  pokemon: Pokemon;

  constructor(private navCtrl: NavController, navParams: NavParams, private apiservice: ApiService) {
    this.pokemonId = navParams.get('pokemonId');
    this.apiservice.getPokemonById(this.pokemonId).subscribe(results => this.pokemon = results, error => this.pokemon = null);
  }

}
