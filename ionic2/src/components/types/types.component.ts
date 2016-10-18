import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'poke-type',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  @Input() type: string;
  private typeColors: Object;
  typeColor: Object;

  constructor(private apiService: ApiService) {
    this.typeColors = apiService.getTypes();
  }

  ngOnInit() {
    this.typeColor = {type: this.type, color: this.typeColors[this.type]};
  }

}
