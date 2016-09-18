export type PokemonGender = 'm' | 'f' | 'g' | 'h';
export type PokemonAttackCategory = 'fast' | 'special';
export type Attack = {
  type: string;
  name: string;
  damage: number;
  _id: string;
};

export class Pokemon {

  pokemonId: number;
  name: string;
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

  previousEvolutions: {
    pokemonId: number;
    name: string;
    _id: string;
  }[];

  nextEvolutions: {
    pokemonId: number;
    name: string;
    _id: string;
  }[];

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

  get icon():string {
    return '/api/pokemon/id/' + this.pokemonId + '/icon';
  }
}
