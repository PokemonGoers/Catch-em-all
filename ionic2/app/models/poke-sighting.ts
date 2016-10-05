import { PokePOI } from './poke-poi';
import { Pokemon } from './pokemon';

export class PokeSighting extends PokePOI {

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
    let instance = Object.create(PokeSighting.prototype);
    return Object.assign(instance, object);
  }
}
