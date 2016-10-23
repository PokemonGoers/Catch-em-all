import { POI } from './poi';

export class Sighting extends POI {
  pokemonId: number;
  source: string;
  appearedOn: string;

  type = 'sighting';
}
