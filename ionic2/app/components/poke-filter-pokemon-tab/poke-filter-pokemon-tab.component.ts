import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { Pipe, PipeTransform } from '@angular/core';
import { PokemonFilterPipe } from './pokemon-filter-pipe';
import { PokemonFilterData } from './pokemon-filter-data';

type PokemonContainer = {pokemon: Pokemon, isSelected: boolean};
type TypeContainer = {
  type: string,
  isSelected: boolean
};

const typeNames: string[] = [
  'fire',
  'ice',
  'poison',
  'flying',
  'bug',
  'grass',
  'water',
  'ground',
  'rock',
  'fight',
  'steel',
  'dragon',
  'fairy',
  'dark',
  'ghost',
  'psychic',
  'electric',
  'normal'
];

@Component({
  template: require('./poke-filter-pokemon-tab.component.html'),
  selector: 'poke-filter-pokemon-tab',
  pipes: [ PokemonFilterPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PokeFilterPokemonTabComponent implements OnInit {

  nameFilter: string;
  typesFilter: string[];

  typeDataBinding: TypeContainer[] = [];

  querySubscription: Subscription;
  pokemonContainers: PokemonContainer[] = [];

  pokeFilterData: PokemonFilterData = {
    pokemonName: "",
    pokemonTypes: []
  }

  testo: string[] = [ "abc", "def", "ghi", "huhu", "as", "rtzuio" ];

  constructor(private apiservice: ApiService) {
  }

  ngOnInit() {
    this.querySubscription = this.apiservice.getAllPokemon()
      .map(pokemonList => {
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
      console.log("CONT: " + this.pokemonContainers);

    for (let str of typeNames) {
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
    this.pokeFilterData.pokemonName = this.nameFilter;
    console.log("FILTER: " + this.pokeFilterData);
  }

  onSearch() {
    // Triggered when the confirm button (e.g. enter) is pressed.
  }

  typeFilterChanged() {
    this.pokeFilterData.pokemonTypes = [];
    for (let typeField of this.typeDataBinding) {
      if (typeField.isSelected) {
        this.pokeFilterData.pokemonTypes.push(typeField.type);
      }
    }
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
    let selectedPokemon: number[] = [];

    for (let pokemonCon of this.pokemonContainers) {
      if (pokemonCon.isSelected) {
          selectedPokemon.push(pokemonCon.pokemon.pokemonId);
      }
    }

    console.log("SELECTED:" + selectedPokemon);
  }
}