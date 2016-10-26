import { Component, Input } from '@angular/core';

import { TypeService } from '../../services/type.service';

@Component({
  selector: 'poke-type',
  templateUrl: './type.component.html'
})
export class TypeComponent {
  @Input() type: string;
  constructor(public typeService: TypeService) { }
}
