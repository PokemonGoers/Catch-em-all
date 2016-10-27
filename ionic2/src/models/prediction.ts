import { POI } from './poi';

export class Prediction extends POI {
  pokemonId: number;
  confidence: number;

  type = 'prediction';
}
