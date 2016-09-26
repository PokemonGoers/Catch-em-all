import { Pipe, PipeTransform } from '@angular/core';
import { PokemonFilterData } from './pokemon-filter-data';

@Pipe({
  name: 'pokemonFilterPipe',
  pure: false
})

export class PokemonFilterPipe implements PipeTransform {
  transform(pokemons: any[], filter: PokemonFilterData) {
    return pokemons
      .filter(pokeCon => {
        if (filter.pokemonName.length > 0) {
          return pokeCon.pokemon.name.toLowerCase().indexOf(filter.pokemonName.toLowerCase()) >= 0;
        }
        return true;
      })
      .filter(pokeCon => {
        if (filter.pokemonTypes.length > 0) {
          for (let ty of filter.pokemonTypes) {
            if (pokeCon.pokemon.types.includes(ty)) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
  }
}
