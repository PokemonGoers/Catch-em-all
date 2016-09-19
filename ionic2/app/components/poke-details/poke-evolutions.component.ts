import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { ApiService } from '../../services/api.service';
import { NavController } from 'ionic-angular';
import { PokeDetailPage } from '../../pages/poke-detail/poke-detail.page';

@Component({
  template: require('./poke-evolutions.component.html'),
  styles: [require('./poke-evolutions.component.scss')],
  selector: 'poke-evolutions'
})

export class PokeEvolutionsComponent {

  @Input('pokemon') pokemon: Pokemon;

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

    for (let evolution of this.pokemon.nextEvolutions) {
      this.apiservice.getPokemonById(evolution.pokemonId)
        .subscribe(results => this.nextPokemons.push(results));
    }

  }

  selectPokemon(pokemon:Pokemon) {
    this.navCtrl.push(PokeDetailPage, {pokemon: pokemon});
  }
}
