import { Page, NavController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { LocationService, LocationQueryResponse } from '../../services/location.service';
import { Pokemon } from '../../models/pokemon';
import { Observable } from 'rxjs';

@Page({
  templateUrl: 'pages/search/search.page.html'
})
export class SearchPage {

  search: string;

  locationResults: Observable<LocationQueryResponse[]> = Observable.of([]);
  locationCount: Observable<number> = Observable.of(0);

  pokemonResults: Observable<Pokemon[]> = Observable.of([]);
  pokemonCount: Observable<number> = Observable.of(0);

  constructor(private navCtrl: NavController, private locationService: LocationService, private api: ApiService) {
  }

  onInput(event) {
    if (this.search.length >= 3) {
      this.pokemonResults = this.api.getPokemonByName(this.search);
      this.locationResults = this.locationService.queryLocation(this.search);
    } else {
      this.pokemonResults = Observable.of([]);
      this.locationResults = Observable.of([]);
    }

    this.locationCount = this.locationResults.map(results => results.length);
    this.pokemonCount = this.pokemonResults.map(results => results.length);
  }

  onCancel(event) {
    this.navCtrl.pop();
  }

  selectPokemon(pokemon:Pokemon) {

  }

  selectLocation(location:LocationQueryResponse) {

  }
}
