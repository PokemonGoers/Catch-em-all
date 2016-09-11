import { Page, NavController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { LocationService } from '../../services/location.service';
import { Pokemon } from '../../models/pokemon';
import { Observable } from 'rxjs';

@Page({
  templateUrl: 'pages/search/search.page.html'
})
export class SearchPage {

  search: string;
  locationResults: Observable<Object[]>;
  pokemonResults: Observable<Pokemon[]>;

  constructor(private navCtrl: NavController, private locationService: LocationService, private api: ApiService) {
  }

  onInput(event) {
    if (this.search.length < 3) {
      return;
    }

    this.locationResults = this.locationService.queryLocation(this.search);
    this.pokemonResults = this.api.getPokemonByName(this.search);

    this.locationResults.subscribe(console.log);
    this.pokemonResults.subscribe(console.log);
  }

  onSearch(event) {
    console.log('search', this.search);
  }
}
