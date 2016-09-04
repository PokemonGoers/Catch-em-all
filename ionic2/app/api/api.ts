import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Pokemon } from './models/pokemon';
import { PokemonIcon } from './models/pokemon-icon';
import { Sighting } from './models/sighting';

export { Pokemon, PokemonIcon, Sighting}

@Injectable()
export class Api {

  constructor(private http: Http) {
  }

  private static handleResponse(Type: any, expectSingle: boolean = false) {
    return function (response: Response) {
      let jsonResponse = response.json();

      if (jsonResponse.message !== 'Success') {
        throw new Error('API Error: ' + response.text());
      }

      let jsonArray: [any] = jsonResponse.data;
      let objectArray = jsonArray.map(object => Type.fromObject(object));

      if (expectSingle) {
        return objectArray.length > 0 ? objectArray[0] : null;
      } else {
        return objectArray;
      }
    }
  }

  getAllPokemon(): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon');
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonById(id: number): Observable<Pokemon> {
    let request = this.http.get('/api/pokemon/id/' + id);
    return request.map(Api.handleResponse(Pokemon, true));
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    let request = this.http.get('/api/pokemon/name/' + name);
    return request.map(Api.handleResponse(Pokemon, true));
  }

  getPokemonByGender(gender: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/gender/' + gender);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByType(type: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/type/' + type);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByWeakness(weakness: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/weakness/' + weakness);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByResistance(resistance: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/resistance/' + resistance);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByAttackType(category: string, type: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/attack/' + category + '/type/' + type);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByAttackName(category: string, name: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/attack/' + category + '/name/' + name);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByAttackDamage(category: string, damage: number): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/attack/' + category + '/damage/' + damage);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByEvolutionId(category: string, id: number): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/evolution/' + category + '/id/' + id);
    return request.map(Api.handleResponse(Pokemon));
  }

  getPokemonByEvolutionName(category: string, name: string): Observable<[Pokemon]> {
    let request = this.http.get('/api/pokemon/evolution/' + category + '/name/' + name);
    return request.map(Api.handleResponse(Pokemon));
  }

  getIconById(id: number): Observable<any> {
    let request = this.http.get('/api/pokemon/id/' + id + '/icon');
    return request.map(Api.handleResponse(PokemonIcon, true));
  }

  getAllSightings(): Observable<[Sighting]> {
    let request = this.http.get('/api/pokemon/sighting');
    return request.map(Api.handleResponse(Sighting));
  }

  getSightingById(id: number): Observable<Sighting> {
    let request = this.http.get('/api/pokemon/sighting/id/' + id);
    return request.map(Api.handleResponse(Sighting, true));
  }

  getSightingBySource(source: string): Observable<[Sighting]> {
    let request = this.http.get('/api/pokemon/sighting/source/' + source);
    return request.map(Api.handleResponse(Sighting));
  }

  getSightingAtCoordinates(coordinates: {longitude:number, latitude:number}): Observable<[Sighting]> {
    let coords = coordinates.longitude + ',' + coordinates.latitude;
    let request = this.http.get('/api/pokemon/sighting/coordinates/' + coords);
    return request.map(Api.handleResponse(Sighting));
  }

  getSightingBetweenCoordinates(from: {longitude:number, latitude:number},
                                to: {longitude:number, latitude:number}): Observable<[Sighting]> {
    let fromCoords = from.longitude + ',' + from.latitude;
    let toCoords = to.longitude + ',' + to.latitude;
    let request = this.http.get('/api/pokemon/sighting/coordinates/from/' + fromCoords + '/to/' + toCoords);
    return request.map(Api.handleResponse(Sighting));
  }

  getSightingByTimeRange(timestamp: string, range: string): Observable<[Sighting]> {
    let request = this.http.get('/api/pokemon/sighting/ts/' + timestamp + '/range/' + range);
    return request.map(Api.handleResponse(Sighting));
  }
}