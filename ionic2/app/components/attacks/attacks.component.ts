import { Component, Input } from '@angular/core';

import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'poke-attacks',
  template: require('./attacks.component.html'),
  styles: [require('./attacks.component.scss')]
})
export class AttacksComponent {

  @Input() pokemon: Pokemon;

}
