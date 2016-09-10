import { Component, Input } from '@angular/core';
import { Searchbar } from '../searchbar/searchbar';

@Component({
  templateUrl: 'components/navbar/navbar.html',
  selector: 'navbar',
  directives: [Searchbar]
})
export class Navbar {

  @Input() title: string;

}
