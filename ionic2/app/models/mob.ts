import { POI } from './poi';

export class Mob extends POI {
  clusterId: number;
  tweets: PokeTweet[];
  timestamp: number;

  get type(): string { return 'mob'; }
}

export type PokeTweet = {
  id: string;
  text: string;
  coordinates: [number, number];  // [longitude, latitude]
  timestamp: number;
}
