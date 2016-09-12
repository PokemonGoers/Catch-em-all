import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { Pokemon } from '../models/pokemon';
import { PokemonIcon } from '../models/pokemon-icon';
import { Sighting } from '../models/sighting';
import { PokemonGender } from "../models/pokemon";
import { PokemonAttackCategory } from "../models/pokemon";
import { SightingSource } from "../models/sighting";

export { Pokemon, PokemonIcon, Sighting}

@Injectable()
export class ApiService {

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

  private static createSearchParamsFromObject(query: Object): URLSearchParams {
    let params = new URLSearchParams();
    for (let key in query) {
      params.append(key, query[key]);
    }
    return params;
  }

  /**
   * Get all Pokemon.
   * @returns {Observable<Pokemon[]>}
   */
  getAllPokemon(): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon');
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific id.
   * @param {number} id Pokemon ID, range 1-151
   * @returns {Observable<Pokemon>}
   */
  getPokemonById(id: number): Observable<Pokemon> {
    let request = this.http.get('/api/pokemon/id/' + id);
    return request.map(ApiService.handleResponse(Pokemon, true));
  }

  /**
   * Get Pokemon by specific name.
   * @param {string} name - Name of the Pokemon
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByName(name: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/name/' + name);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific gender.
   * @param {string} gender - Gender of the Pokemon, allowed values: [m, f, g, h]
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByGender(gender: PokemonGender): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/gender/' + gender);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific type.
   * @param {string} type - Type of the Pokemon
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByType(type: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/type/' + type);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific weakness.
   * @param {string} weakness - Weakness of the Pokemon
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByWeakness(weakness: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/weakness/' + weakness);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific resistance.
   * @param {string} resistance - Resistance factor of the Pokemon
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByResistance(resistance: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/resistance/' + resistance);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific attack type.
   * @param {string} category - Category of attack, allowed values: [fast, special]
   * @param {string} type - Type of the attack
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByAttackType(category: PokemonAttackCategory, type: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/attack/' + category + '/type/' + type);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific attack name.
   * @param {string} category - Category of attack, allowed values: [fast, special]
   * @param {string} name - Name of the attack
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByAttackName(category: PokemonAttackCategory, name: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/attack/' + category + '/name/' + name);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific attack damage.
   * @param {string} category - Category of attack, allowed values: [fast, special]
   * @param {number} damage - Damage value of the attack
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByAttackDamage(category: PokemonAttackCategory, damage: number): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/attack/' + category + '/damage/' + damage);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific evolution ID.
   * @param {string} category - Category of attack, allowed values: [fast, special]
   * @param {number} id - ID of the evolved Pokemon, range 1-151
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByEvolutionId(category: PokemonAttackCategory, id: number): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/evolution/' + category + '/id/' + id);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specific evolution name.
   * @param {string} category - Category of attack, allowed values: [fast, special]
   * @param {string} name - Name of the evolved Pokemon
   * @returns {Observable<Pokemon[]>}
   */
  getPokemonByEvolutionName(category: PokemonAttackCategory, name: string): Observable<Pokemon[]> {
    let request = this.http.get('/api/pokemon/evolution/' + category + '/name/' + name);
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get Pokemon by specified search parameters.
   * @param {Object} query - search parameters
   * @returns {Observable<Pokemon[]>}
   */
  searchPokemon(query: Object): Observable<Pokemon[]> {
    let params = ApiService.createSearchParamsFromObject(query);
    let request = this.http.get('/api/pokemon/search', {
      search: params
    });
    return request.map(ApiService.handleResponse(Pokemon));
  }

  /**
   * Get pokemon icon by specific id.
   * @param {number} id - Pokemon ID, range 1-151
   * @returns {Observable<PokemonIcon>}
   */
  getIconById(id: number): Observable<PokemonIcon> {
    let request = this.http.get('/api/pokemon/id/' + id + '/icon');
    return request.map(ApiService.handleResponse(PokemonIcon, true));
  }

  /**
   * Get all Pokemon sightings.
   * @returns {Observable<Sighting[]>}
   */
  getAllSightings(): Observable<Sighting[]> {
    let request = this.http.get('/api/pokemon/sighting');
    return request.map(ApiService.handleResponse(Sighting));
  }

  /**
   * Get Pokemon sightings by Pokemon id.
   * @param {number} id - Pokemon ID, range 1-151
   * @returns {Observable<Sighting>}
   */
  getSightingById(id: number): Observable<Sighting> {
    let request = this.http.get('/api/pokemon/sighting/id/' + id);
    return request.map(ApiService.handleResponse(Sighting, true));
  }

  /**
   * Get Pokemon sightings by specific source.
   * @param {string} source - Source of the data extraction,
   * allowed values: [twitter, pokesniper, pokeradar, skiplagged, pokecrew]
   * @returns {Observable<Sighting[]>}
   */
  getSightingBySource(source: SightingSource): Observable<Sighting[]> {
    let request = this.http.get('/api/pokemon/sighting/source/' + source);
    return request.map(ApiService.handleResponse(Sighting));
  }

  /**
   * Get Pokemon sightings at specific coordinates.
   * @param {Object} coordinates - Location coordinates specified by Longitude, Latitude
   * @returns {Observable<Sighting[]>}
   */
  getSightingAtCoordinates(coordinates: {longitude:number, latitude:number}): Observable<Sighting[]> {
    let coords = coordinates.longitude + ',' + coordinates.latitude;
    let request = this.http.get('/api/pokemon/sighting/coordinates/' + coords);
    return request.map(ApiService.handleResponse(Sighting));
  }

  /**
   * Get Pokemon sightings between specific set of coordinates.
   * @param {Object} from - Coordinates of starting location specified by Longitude, Latitude
   * @param {Object} to - Coordinates of end location specified by Longitude, Latitude
   * @returns {Observable<Sighting[]>}
   */
  getSightingBetweenCoordinates(from: {longitude:number, latitude:number},
                                to: {longitude:number, latitude:number}): Observable<Sighting[]> {
    let fromCoords = from.longitude + ',' + from.latitude;
    let toCoords = to.longitude + ',' + to.latitude;
    let request = this.http.get('/api/pokemon/sighting/coordinates/from/' + fromCoords + '/to/' + toCoords);
    return request.map(ApiService.handleResponse(Sighting));
  }

  /**
   * Get Pokemon sightings within a specific time range.
   * @param {string} timestamp - Starting time-stamp in UTC format
   * @param {string} range - w(Week), d(Day), h(Hour), m(Minute),
   * values can be specified preceding the letters. Example: 1w, 5d, 2h, 30m etc.
   * @returns {Observable<Sighting[]>}
   */
  getSightingByTimeRange(timestamp: string, range: string): Observable<Sighting[]> {
    let request = this.http.get('/api/pokemon/sighting/ts/' + timestamp + '/range/' + range);
    return request.map(ApiService.handleResponse(Sighting));
  }

  /**
   * Get Pokemon sightings by specified search parameters.
   * @param {Object} query - search parameters
   * @returns {Observable<Sighting[]>}
   */
  searchSightings(query: Object): Observable<Sighting[]> {
    let params = ApiService.createSearchParamsFromObject(query);
    let request = this.http.get('/api/pokemon/sighting/search', {
      search: params
    });
    return request.map(ApiService.handleResponse(Sighting));
  }
}