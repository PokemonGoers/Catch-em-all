import { POI } from './poi';
import { Pokemon } from './pokemon';

export class Prediction extends POI {
  pokemonId: number;

  get type(): string { return 'prediction'; }
}
