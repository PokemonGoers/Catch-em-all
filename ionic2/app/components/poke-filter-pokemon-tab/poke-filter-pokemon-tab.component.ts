import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../../models/pokemon';

type PokemonContainer = {pokemon:Pokemon, isSelected:boolean};

@Component({
  template: require('./poke-filter-pokemon-tab.component.html'),
  selector: 'poke-filter-pokemon-tab'
})

export class PokeFilterPokemonTabComponent implements OnInit, OnDestroy {

  querySubscription: Subscription;
  pokemonContainers: PokemonContainer[] = [];

  constructor(private apiservice: ApiService) {
  }

  ngOnInit() {
    this.querySubscription = this.apiservice.getAllPokemon()
      .map(pokemonList => {
        console.log('list', pokemonList);
        return pokemonList.map(pokemon => {
          return {
            pokemon: pokemon,
            isSelected: true
          };
        })
      }).subscribe(
        pokemonContainers => this.pokemonContainers = pokemonContainers,
        error => this.pokemonContainers = []
      );
  }

  ngOnDestroy() {
    this.cancelRequests();
  }

  getFilteredPokemon() {
    return this.pokemonContainers.filter(pokemonContainer => this.filter(pokemonContainer.pokemon));
  }

  filter(pokemon: Pokemon) {
    return pokemon.types.indexOf('water') >= 0;
  }

  cancelRequests() {
    if (this.querySubscription && !this.querySubscription.isUnsubscribed) {
      this.querySubscription.unsubscribe();
    }
  }

  filterChanged() {
    let selectedPokemon: number[] = [];

    for (let pokemonCon of this.pokemonContainers) {
      if (pokemonCon.isSelected) {
          selectedPokemon.push(pokemonCon.pokemon.pokemonId);
      }
    }

    console.log(selectedPokemon);
  }
}
