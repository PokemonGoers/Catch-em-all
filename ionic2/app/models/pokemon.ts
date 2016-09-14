export type PokeGender = 'm' | 'f' | 'g' | 'h';
export type PokeAttackCategory = 'fast' | 'special';

export class Pokemon {

  pokemonId: number;
  name: string;
  classification: string;
  maxHP: number;
  maxCP: number;
  fleeRate: number;
  weakness: [string];
  resistance: [string];
  types: [string];

  gender: {
    abbreviation: PokeGender;
    maleRatio: number;
    femaleRatio: number;
    breedable: boolean;
  };

  previousEvolutions: [{
    pokemonId: number;
    name: string;
    _id: string;
  }];

  nextEvolutions: [{
    pokemonId: number;
    name: string;
    _id: string;
  }];

  height: {
    maximum: string;
    minimum: string;
  };

  weight: {
    maximum: string;
    minimum: string;
  };

  specialAttacks: [{
    type: string;
    name: string;
    damage: number;
    _id: string;
  }];

  fastAttacks: [{
    type: string;
    name: string;
    damage: number;
    _id: string;
  }];

  static fromObject(object: Object): Pokemon {
    let instance = Object.create(Pokemon.prototype);
    return Object.assign(instance, object);
  }

  get icon():string {
    return '/api/pokemon/id/' + this.pokemonId + '/icon';
  }
}
