import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  template: require('./attacks.component.html'),
  styles: [require('./attacks.component.scss')],
  selector: 'poke-attacks'
})

export class AttacksComponent {

  @Input() pokemon: Pokemon;

}
