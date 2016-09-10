import { Component } from '@angular/core';

@Component({
  templateUrl: 'components/searchbar/searchbar.html',
  selector: 'searchbar'
})
export class Searchbar {

  search: string;

  onInput(event) {
    console.log('input', this.search);
  }

  onSearch(event) {
    console.log('search', this.search);
  }

}
