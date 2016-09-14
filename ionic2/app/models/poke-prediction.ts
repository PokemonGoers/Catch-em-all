import { PokePOI } from './poke-poi';

export class PokePrediction extends PokePOI {

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