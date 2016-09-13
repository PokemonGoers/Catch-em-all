import { forwardRef } from "@angular/core";
import { Page, NavController, NavParams } from "ionic-angular";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ApiService } from '../../services/api.service';
import { Pokemon } from "../../models/pokemon";

@Page({
  templateUrl: 'pages/pokedetail/poke-detail.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})

export class PokeDetailPage {

  pokemonId: number;
  pokemonData: Pokemon;

  constructor(private navCtrl: NavController, private navParams: NavParams, private apiservice: ApiService) {
    this.pokemonId = navParams.get('pokemonId');
    this.apiservice.getPokemonById(this.pokemonId).subscribe(results => this.pokemonData = results, error => this.pokemonData = null);
  }

}
