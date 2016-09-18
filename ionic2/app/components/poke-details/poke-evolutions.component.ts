import { Component, Input } from '@angular/core';
import { Pokemon } from "../../models/pokemon";
import { ApiService } from '../../services/api.service';
import { NavController } from "ionic-angular";
import { PokeDetailPage } from "../../pages/pokedetail/pokedetail.page";

@Component({
  templateUrl: 'components/poke-details/poke-evolutions.component.html',
  selector: 'poke-evolutions'
})

export class PokeEvolutionsComponent {

  @Input("pokemon") pokemon: Pokemon;

  public prevPokemon: Pokemon;
  public nextPokemons: Pokemon[];

  constructor(private apiservice: ApiService, private navCtrl: NavController) {
    this.nextPokemons = [];
  }

  ngOnInit() {
    if (this.pokemon.previousEvolutions.length > 0) {
      this.apiservice.getPokemonById(this.pokemon.previousEvolutions[0].pokemonId)
        .subscribe(results => this.prevPokemon = results, error => this.prevPokemon = null);
    }

    for (var i=0, len=this.pokemon.nextEvolutions.length; i<len; i++) {
      this.apiservice.getPokemonById(this.pokemon.nextEvolutions[i].pokemonId)
        .subscribe(results => this.nextPokemons.push(results));
    }

  }

  selectPokemon(pokemon:Pokemon) {
    this.navCtrl.push(PokeDetailPage, {pokemonId: pokemon.pokemonId});
  }
}
