import { POI } from './poi';
import { Pokemon } from './pokemon';

export class Prediction extends POI {

  pokemonId: number;
  pokemon: Pokemon;

  getLocation(): {latitude:number, longitude:number} {
    return undefined;
  }

  getType(): string {
    return 'prediction';
  }

  static fromObject(object: Object): Prediction {
    return Object.assign(new Prediction(), object);
  }
}
