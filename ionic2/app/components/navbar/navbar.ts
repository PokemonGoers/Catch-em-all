import { Component, Input } from '@angular/core';

@Component({
  templateUrl: 'components/navbar/navbar.html',
  selector: 'navbar'
})
export class Navbar {

  @Input() title: string;

  search: string;

  onInput(event) {
    console.log('input', this.search);
  }

  onSearch(event) {
    console.log('search', this.search);
  }

}
