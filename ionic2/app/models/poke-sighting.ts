import { POI } from './poi';
import { Pokemon } from './pokemon';

export class PokeSighting extends POI {

  pokemonId: number;
  pokemon: Pokemon;
  source: string;
  appearedOn: string;

  location: {
    coordinates: [number, number];  // [longitude, latitude]
    type: string;
  };

  getLocation(): {latitude:number, longitude:number} {
    return {
      latitude: this.location.coordinates[1],
      longitude: this.location.coordinates[0]
    };
  }

  getType(): string {
    return 'sighting';
  }

  static fromObject(object: Object): PokeSighting {
    return Object.assign(new PokeSighting(), object);
  }
}
