import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'poke-type',
  template: require('./types.component.html'),
  styles: [require('./types.component.scss')]
})
export class TypesComponent implements OnInit {

  @Input() types: string[];
  typesArray: Object[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let typeColors = this.apiService.getTypes();

    this.typesArray = [];
    for (let item of this.types) {
      this.typesArray.push({element:item, color:typeColors[item]})
    }
  }

}
