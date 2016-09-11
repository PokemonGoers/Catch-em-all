import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

export type LocationQueryResponse = {
  location: string,
  coordinates: {
    latitude: number;
    longitude: number;
  }
}

@Injectable()
export class LocationService {

  private apiEndpoint: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http:Http) {}

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
    return data.results.map((result:any) => {
      return {
        address: result.formatted_address,
        coordinates: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng
        }
      };
    });
  }

}