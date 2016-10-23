import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'poke-type',
  templateUrl: './types.component.html'
})
export class TypesComponent implements OnInit {

  @Input() type: string;
  private typeColors: { [key:string]:string; };
  typeColor: { type:string, color:string };

  constructor(private apiService: ApiService) {
    this.typeColors = apiService.getTypes();
  }

  ngOnInit() {
    this.typeColor = {type: this.type, color: this.typeColors[this.type]};
  }

}
