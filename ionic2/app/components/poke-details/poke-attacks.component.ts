import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./poke-attacks.component.html'),
  styles: [require('./poke-attacks.component.scss')],
  selector: 'poke-attacks'
})

export class PokeAttacksComponent {

  @Input() pokemon: Pokemon;

}
