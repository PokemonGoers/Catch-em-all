import { Page, NavController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { LocationService, LocationQueryResponse } from '../../services/location.service';
import { Pokemon } from '../../models/pokemon';
import { Observable, Subscription } from 'rxjs';
import { WikiPage } from '../wiki/wiki.page';
import { MapPage } from '../map/map.page';

@Page({
  template: require('./search.page.html')
})
export class SearchPage {

  search: string;

  pokemonResults: Pokemon[] = [];
  locationResults: LocationQueryResponse[] = [];

  pokemonQuery: Subscription;
  locationQuery: Subscription;

  constructor(private navCtrl: NavController, private locationService: LocationService, private api: ApiService) {
  }

  onInput(event) {
    this.cancelRequests();

    if (this.search.length >= 3) {
      // Search Pokemon
      this.pokemonQuery = this.api.getPokemonByName(this.search)
        .subscribe(results => this.pokemonResults = results, error => this.pokemonResults = []);

      // Search Locations
      this.locationQuery = this.locationService.queryLocation(this.search)
        .subscribe(results => this.locationResults = results, error => this.locationResults = []);
    } else {
      this.pokemonResults = [];
      this.locationResults = [];
    }
  }

  onCancel(event) {
    this.navCtrl.pop();
  }

  onSearch(event) {
    // Triggered when the confirm button (e.g. enter) is pressed.
    // If there is exactly one search result we will select
    if (this.pokemonResults.length === 1 && this.locationResults.length === 0) {
      this.selectPokemon(this.pokemonResults[0]);
    } else if (this.locationResults.length === 1 && this.pokemonResults.length === 0) {
      this.selectLocation(this.locationResults[0])
    }
  }

  cancelRequests() {
    if (this.locationQuery && !this.locationQuery.isUnsubscribed) {
      this.locationQuery.unsubscribe();
    }
    if (this.pokemonQuery && !this.pokemonQuery.isUnsubscribed) {
      this.pokemonQuery.unsubscribe();
    }
  }

  selectPokemon(pokemon:Pokemon) {
    this.cancelRequests();
    this.navCtrl.setRoot(WikiPage, {pokemonId: pokemon.pokemonId});
  }

  selectLocation(location:LocationQueryResponse) {
    this.cancelRequests();
    this.navCtrl.setRoot(MapPage, location.coordinates);
  }
}
