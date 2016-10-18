import { POI } from './poi';
import { Pokemon } from './pokemon';

export class Sighting extends POI {
  pokemonId: number;
  source: string;
  appearedOn: string;

  get type(): string { return 'sighting'; }
}
