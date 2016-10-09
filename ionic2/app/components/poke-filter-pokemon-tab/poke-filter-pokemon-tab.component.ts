import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { PokemonFilterPipe } from './pokemon-filter-pipe';
import { PokemonFilterData } from './pokemon-filter-data';
import { Filter } from '../../models/filter';
import { FilterService } from '../../services/filter.service';

type PokemonContainer = {pokemon: Pokemon, isSelected: boolean};
type TypeContainer = {type: string, isSelected: boolean};

@Component({
  template: require('./poke-filter-pokemon-tab.component.html'),
  selector: 'poke-filter-pokemon-tab',
  pipes: [PokemonFilterPipe]
})

export class PokeFilterPokemonTabComponent implements OnInit {

  pokemonIds: number[];

  nameFilter: string;
  typeDataBinding: TypeContainer[] = [];

  querySubscription: Subscription;
  pokemonContainers: PokemonContainer[] = [];

  pokeFilterData: PokemonFilterData = {
    pokemonName: '',
    pokemonTypes: []
  };

  constructor(private apiservice: ApiService, private filterService: FilterService) {
  }

  ngOnInit() {
    this.pokemonIds = this.filterService.pokemonIds;

    this.querySubscription = this.apiservice.getAllPokemon()
      .map(pokemonList => {
        return pokemonList.map(pokemon => {
          return {
            pokemon: pokemon,
            isSelected: this.pokemonIds === null || this.pokemonIds.indexOf(pokemon.pokemonId) >= 0
          };
        })
      })
      .subscribe(
        pokemonContainers => this.pokemonContainers = pokemonContainers,
        error => this.pokemonContainers = []
      );

    for (let str in this.apiservice.getTypes()) {
      this.typeDataBinding.push({
        type: str,
        isSelected: false
      });
    }
  }

  ionViewDidUnload() {
    this.cancelRequests();
  }

  cancelRequests() {
    if (this.querySubscription && !this.querySubscription.isUnsubscribed) {
      this.querySubscription.unsubscribe();
    }
  }

  onNameInput() {
    this.nameFilterChanged();
  }

  onSearch() {
    // Triggered when the confirm button (e.g. enter) is pressed.
  }

  nameFilterChanged() {
    this.pokeFilterData.pokemonName = this.nameFilter;
    console.log('NAME FILTER CHANGED: ' + this.pokeFilterData.pokemonName);
  }

  typeFilterChanged() {
    this.pokeFilterData.pokemonTypes = [];
    for (let typeField of this.typeDataBinding) {
      if (typeField.isSelected) {
        this.pokeFilterData.pokemonTypes.push(typeField.type);
      }
    }
    console.log('TYPE FILTER CHANGED: ' + this.pokeFilterData.pokemonTypes);
  }

  selectAll() {
    for (let cont of this.pokemonContainers) {
      cont.isSelected = true;
    }
  }

  selectNone() {
    for (let cont of this.pokemonContainers) {
      cont.isSelected = false;
    }
  }

  applyFilters() {
    this.pokemonIds = [];

    for (let pokemonCon of this.pokemonContainers) {
      if (pokemonCon.isSelected) {
        this.pokemonIds.push(pokemonCon.pokemon.pokemonId);
      }
    }

    this.filterService.pokemonIds = this.pokemonIds;
    console.log('SELECTED: (' + this.pokemonIds.length + '): ' + this.pokemonIds);
  }

}
