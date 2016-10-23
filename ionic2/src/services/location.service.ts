import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

export type LocationQueryResponse = {
  location: string,
  coordinates: {
    latitude: number;
    longitude: number;
  },
  zoomLevel: number
}

@Injectable()
export class LocationService {

  private apiEndpoint: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: Http) {}

  queryLocation(location): Observable<LocationQueryResponse[]> {
    let params = new URLSearchParams();
    params.append('address', location);
    let request = this.http.get(this.apiEndpoint, {
      search: params
    });
    return request.map(LocationService.handleResponse);
  }

  private static handleResponse(response: Response): LocationQueryResponse[] {
    let data = response.json();
    let dimensions = LocationService.getMapDimensions();

    return data.results.map((result: any) => {
      let viewport = result.geometry.viewport;
      let location = result.geometry.location;

      let zoomLevel = LocationService.getBoundsZoomLevel(viewport.northeast, viewport.southwest, dimensions);

      return {
        address: result.formatted_address,
        coordinates: {
          latitude: location.lat,
          longitude: location.lng
        },
        zoomLevel: zoomLevel
      };
    });
  }

  private static getBoundsZoomLevel(northEast, southWest, dimensions) {
    // http://stackoverflow.com/a/13274361
    var WORLD_DIM = {height: 256, width: 256};
    var ZOOM_MAX = 21;

    function latRad(lat) {
      var sin = Math.sin(lat * Math.PI / 180);
      var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var latFraction = (latRad(northEast.lat) - latRad(southWest.lat)) / Math.PI;

    var lngDiff = northEast.lng - southWest.lng;
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(dimensions.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(dimensions.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }

  private static getMapDimensions() {
    // http://stackoverflow.com/a/8876069
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let headerHeight = 60;
    height -= headerHeight;

    return {width, height};
  }

}
