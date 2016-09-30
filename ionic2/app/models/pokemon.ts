import { ReflectiveInjector } from '@angular/core';
import { ConfigService } from '../services/config.service';

const configServiceInjector = ReflectiveInjector.resolveAndCreate([ConfigService]);
const config: ConfigService = configServiceInjector.get(ConfigService);

export type PokemonGender = 'm' | 'f' | 'g' | 'h';
export type PokemonAttackCategory = 'fast' | 'special';
export type Attack = {
  type: string;
  name: string;
  damage: number;
  _id: string;
};
export type Evolution = {
  pokemonId: number;
  name: string;
  _id: string;
}

export class Pokemon {

  pokemonId: number;
  name: string;
  description: string;
  classification: string;
  maxHP: number;
  maxCP: number;
  fleeRate: number;
  weakness: string[];
  resistance: string[];
  types: string[];

  gender: {
    abbreviation: PokemonGender;
    maleRatio: number;
    femaleRatio: number;
    breedable: boolean;
  };

  previousEvolutions: Evolution[];
  nextEvolutions: Evolution[];

  height: {
    maximum: string;
    minimum: string;
  };

  weight: {
    maximum: string;
    minimum: string;
  };

  specialAttacks: Attack[];
  fastAttacks: Attack[];

  static fromObject(object: Object): Pokemon {
    let instance = Object.create(Pokemon.prototype);
    return Object.assign(instance, object);
  }

  get gifIcon(): string {
    return config.apiEndpoint + '/api/pokemon/id/' + this.pokemonId + '/icon/gif';
  }

  get pngIcon(): string {
    return config.apiEndpoint + '/api/pokemon/id/' + this.pokemonId + '/icon/png';
  }

  get svgIcon(): string {
    return config.apiEndpoint + '/api/pokemon/id/' + this.pokemonId + '/icon/svg';
  }

}
