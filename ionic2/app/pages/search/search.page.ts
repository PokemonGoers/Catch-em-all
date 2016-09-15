import {Page, NavController} from "ionic-angular";
import {ApiService} from "../../services/api.service";
import {LocationService, LocationQueryResponse} from "../../services/location.service";
import {Pokemon} from "../../models/pokemon";
import {Subscription} from "rxjs";
import {PokeDetailPage} from "../poke-detail/poke-detail.page";
import {WikiIndexPage} from "../wiki-index/wiki-index.page";
import {MapPage} from "../map/map.page";

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

  onInput() {
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

  onCancel() {
    this.navCtrl.pop();
  }

  onSearch() {
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

  selectPokemon(pokemon: Pokemon) {
    this.cancelRequests();
    this.navCtrl.setPages([{page: WikiIndexPage}, {page: PokeDetailPage, params: {pokemonId: pokemon.pokemonId}}]);
  }

  selectLocation(location: LocationQueryResponse) {
    this.cancelRequests();
    this.navCtrl.setRoot(MapPage, location.coordinates);
  }
}
