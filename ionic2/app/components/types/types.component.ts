import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  template: require('./types.component.html'),
  styles: [require('./types.component.scss')],
  selector: 'poke-type',
})
export class TypesComponent implements OnInit {

  @Input() type: string[];
  typeArray: Object[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let typeColors = this.apiService.getTypes();

    this.typeArray = [];
    for (let item of this.type){
      this.typeArray.push({element:item, color:typeColors[item]})
    }
  }

}
