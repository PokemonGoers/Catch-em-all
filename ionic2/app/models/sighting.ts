export type SightingSource = 'twitter' | 'pokesniper' | 'pokeradar' | 'skiplagged' | 'pokecrew';

export class Sighting {

  pokemonId: number;
  source: string;
  appearedOn: string;

  location: {
    coordinates: [number, number];
    type: string;
  };

  static fromObject(object: Object): Sighting {
    let instance = Object.create(Sighting.prototype);
    return Object.assign(instance, object);
  }
}