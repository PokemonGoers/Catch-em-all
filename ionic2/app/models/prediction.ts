import { PokePOI } from './poke-poi';

export class Prediction extends PokePOI {

  static fromObject(object: Object): Prediction {
    let instance = Object.create(Prediction.prototype);
    return Object.assign(instance, object);
  }

}