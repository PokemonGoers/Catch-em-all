import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService } from '../../services/api.service';
import { Pokemon } from '../../models/pokemon';
import { PokeDetailPage } from '../../pages/poke-detail/poke-detail.page';

@Component({
  selector: 'poke-evolutions',
  templateUrl: './evolutions.component.html'
})
export class EvolutionsComponent implements OnInit {

  @Input() pokemon: Pokemon;

  public prevPokemons: Pokemon[] = [];
  public nextPokemons: Pokemon[] = [];

  constructor(private apiService: ApiService, private navCtrl: NavController) { }

  ngOnInit() {

    for (let evolution of this.pokemon.previousEvolutions) {
      this.apiService.getPokemonById(evolution.pokemonId)
        .subscribe(results => this.prevPokemons.push(results), error => console.log(error));
    }

    for (let evolution of this.pokemon.nextEvolutions) {
      this.apiService.getPokemonById(evolution.pokemonId)
        .subscribe(results => this.nextPokemons.push(results), error => console.log(error));
    }

  }

  selectPokemon(pokemon:Pokemon) {
    this.navCtrl.push(PokeDetailPage, {pokemon: pokemon});
  }

}
