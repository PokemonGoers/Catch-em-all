import { PokePOI } from './poke-poi';

export type SightingSource = 'twitter' | 'pokesniper' | 'pokeradar' | 'skiplagged' | 'pokecrew';

export class Sighting extends PokePOI {

  source: string;
  appearedOn: string;

  static fromObject(object: Object): Sighting {
    let instance = Object.create(Sighting.prototype);
    return Object.assign(instance, object);
  }
}