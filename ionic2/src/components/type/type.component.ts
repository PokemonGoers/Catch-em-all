import { Component, Input } from '@angular/core';

import { typeColors } from '../../utils/types';

@Component({
  selector: 'poke-type',
  templateUrl: './type.component.html'
})
export class TypeComponent {
  @Input() type: string;
  typeColors = typeColors;
}
