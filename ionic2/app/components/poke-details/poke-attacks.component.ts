import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./poke-attacks.component.html'),
  selector: 'poke-attacks'
})

export class PokeAttacksComponent {

  @Input('pokemon') pokemon: Pokemon;

}
