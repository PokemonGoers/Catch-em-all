import { Component, Input } from '@angular/core';
import { Pokemon } from "../../models/pokemon";
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'components/poke-details/poke-evolution.component.html',
  selector: 'poke-evolution'
})

export class PokeEvolutionComponent {

  @Input("pokemon") pokemon: Pokemon;

  public prevPokemon: Pokemon;
  public nextPokemons: Pokemon[];

  constructor(private apiservice: ApiService) {
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

    //FIXME: Remove this; for debugging of multiple evolutions only
    /*this.apiservice.getPokemonById(4)
      .subscribe(results => this.nextPokemons.push(results));*/
  }
}
