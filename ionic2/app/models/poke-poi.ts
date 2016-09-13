import { Pokemon } from './pokemon';

export class PokePOI {
  pokemonId: number;
  pokemon: Pokemon;

  location: {
    coordinates: [number, number];
    type: string;
  };

  static fromObject(object: Object): PokePOI {
    let instance = Object.create(PokePOI.prototype);
    return Object.assign(instance, object);
  }
}
