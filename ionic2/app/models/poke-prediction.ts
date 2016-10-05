import { PokePOI } from './poke-poi';
import { Pokemon } from './pokemon';

export class PokePrediction extends PokePOI {

  pokemonId: number;
  pokemon: Pokemon;

  getLocation(): {latitude:number, longitude:number} {
    return undefined;
  }

  getType(): string {
    return 'prediction';
  }

  static fromObject(object: Object): PokePrediction {
    let instance = Object.create(PokePrediction.prototype);
    return Object.assign(instance, object);
  }
}
