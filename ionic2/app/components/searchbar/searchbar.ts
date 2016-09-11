import { Component } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: 'components/searchbar/searchbar.html',
  selector: 'searchbar'
})
export class Searchbar {

  search: string;

  constructor(private locationService: LocationService, private api: ApiService) {
  }

  onInput(event) {
    this.locationService.queryLocation(this.search).subscribe(locations => {
      console.log('locations', locations);
    });
    this.api.getPokemonByName(this.search).subscribe(pokemon => {
      console.log('pokemon', pokemon)
    })

  }

  onSearch(event) {
    console.log('search', this.search);
  }

}
