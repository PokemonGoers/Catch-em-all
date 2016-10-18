import { POI } from './poi';
import { Pokemon } from './pokemon';

export class PokePrediction extends POI {

  pokemonId: number;
  pokemon: Pokemon;

  getLocation(): {latitude:number, longitude:number} {
    return undefined;
  }

  getType(): string {
    return 'prediction';
  }

  static fromObject(object: Object): PokePrediction {
    return Object.assign(new PokePrediction(), object);
  }
}
