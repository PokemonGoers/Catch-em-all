import { POI } from './poi';

export class Mob extends POI {
  clusterId: number;
  tweets: MobTweet[];
  timestamp: number;

  type = 'mob';
}

export type MobTweet = {
  id: string;
  text: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}
