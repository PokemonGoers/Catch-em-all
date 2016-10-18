export abstract class POI {
  latitude: number;
  longitude: number;
  abstract get type(): string;
}
