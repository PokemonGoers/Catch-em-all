export abstract class POI {

  abstract getLocation(): { latitude:number, longitude:number };

  abstract getType(): string;
}
