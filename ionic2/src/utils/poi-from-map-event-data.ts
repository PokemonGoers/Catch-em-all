import { POI } from '../models/poi';
import { Sighting } from '../models/sighting';
import { Mob, MobTweet } from '../models/mob';

export function poiFromMapEventData(rawData: any) : POI {
  if ('source' in rawData) {
    const sighting = new Sighting();
    sighting.latitude = rawData.location.coordinates[1];
    sighting.longitude = rawData.location.coordinates[0];
    sighting.pokemonId = rawData.pokemonId;
    sighting.source = rawData.source;
    sighting.appearedOn = rawData.appearedOn;
    return sighting;
  } else if ('clusterId' in rawData) {
    const mob = new Mob();
    mob.clusterId = rawData.clusterId;
    mob.timestamp = rawData.timestamp;
    mob.latitude = rawData.coordinates[1];
    mob.longitude = rawData.coordinates[0];
    mob.tweets = rawData.tweets.map(t => {
      return <MobTweet>{
        id: t.id,
        text: t.text,
        latitude: t.coordinates[1],
        longitude: t.coordinates[0],
        timestamp: t.timestamp
      }
    })
    return mob;
  } else {
    throw new Error('POI cannot be identified as ' +
                    'Sighting or Mob:\n' + JSON.stringify(rawData));
  }
}
