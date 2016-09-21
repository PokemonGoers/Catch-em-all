import { Pokemon } from './pokemon';

export abstract class PokePOI {

  abstract getLocation(): {latitude:number, longitude:number};

  abstract getType(): string;

  pokemon: Pokemon;
}
