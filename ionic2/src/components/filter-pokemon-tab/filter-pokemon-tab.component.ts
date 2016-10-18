import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Pokemon } from '../../models/pokemon';
import { PokemonFilterData } from '../../models/pokemon-filter-data';
import { ApiService } from '../../services/api.service';
import { FilterService } from '../../services/filter.service';


type PokemonContainer = {pokemon: Pokemon, isSelected: boolean};
type TypeContainer = {type: string[], isSelected: boolean};

@Component({
  selector: 'poke-filter-pokemon-tab',
  template: './filter-pokemon-tab.component.html',
  styleUrl: './filter-pokemon-tab.component.scss'
})
export class FilterPokemonTabComponent implements OnInit {

  pokemonIds: number[];

  nameFilter: string;
  typeDataBinding: TypeContainer[] = [];

  querySubscription: Subscription;
  pokemonContainers: PokemonContainer[] = [];

  pokeFilterData: PokemonFilterData = {
    pokemonName: '',
    pokemonTypes: []
  };

  constructor(private apiService: ApiService, private filterService: FilterService) { }

  ngOnInit() {
    this.pokemonIds = this.filterService.pokemonIds;

    this.querySubscription = this.apiService.getAllPokemon()
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

    for (let str in this.apiService.getTypes()) {
      this.typeDataBinding.push({
        type: [str],
        isSelected: false
      });
    }
  }

  ionViewDidUnload() {
    this.cancelRequests();
  }

  cancelRequests() {
    if (this.querySubscription && !this.querySubscription.closed) {
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
        this.pokeFilterData.pokemonTypes.push(typeField.type[0]);
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
