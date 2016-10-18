import { POI } from './poi';

export class Mob extends POI {

  clusterId: number;
  tweets: PokeTweet[];
  coordinates: [number, number]; // [longitude, latitude]
  timestamp: number;
  isMob: boolean;

  getLocation(): {latitude:number, longitude:number} {
    return {
      latitude: this.coordinates[1],
      longitude: this.coordinates[0]
    };
  }

  getType(): string {
    return 'mob';
  }

  static fromObject(object: Object): Mob {
    return Object.assign(new Mob(), object);
  }
}

export type PokeTweet = {
  id: string;
  text: string;
  coordinates: [number, number];  // [longitude, latitude]
  timestamp: number;
}
