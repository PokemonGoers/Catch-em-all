import { Component, Input, ViewChild, animate, trigger, state, style, transition } from '@angular/core';
import { Searchbar } from '../searchbar/searchbar.component';

@Component({
  templateUrl: 'components/navbar/navbar.component.html',
  selector: 'navbar',
  directives: [Searchbar],
  animations: [
    trigger('searchbarAnimate', [
      state('visible', style({transform: 'translateX(0)', opacity: 1})),
      state('hidden', style({transform: 'translateX(100%)', opacity: 0})),
      transition('visible <=> hidden', animate('300ms ease-in')),
    ])
  ]
})
export class Navbar {

  @Input() title: string;

  searchbarState: string = 'hidden';

  constructor() {
    this.searchbarState = sessionStorage['searchbar'] || 'hidden';
  }

  toggleSearchBar() {
    this.searchbarState = this.searchbarState == 'visible' ? 'hidden' : 'visible';
    sessionStorage['searchbar'] = this.searchbarState;
  }

}
