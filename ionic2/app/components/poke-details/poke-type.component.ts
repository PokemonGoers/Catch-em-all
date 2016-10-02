import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  template: require('./poke-type.component.html'),
  styles: [require('./poke-type.component.scss')],
  selector: 'poke-type',
})

export class PokeTypeComponent implements OnInit {

  @Input() type: string[];
  typeArray: Object[];

  constructor(private apiservice: ApiService) {
  }

  ngOnInit() {
    let typeColors = this.apiservice.getTypes();

    this.typeArray = [];
    for (let item of this.type){
      this.typeArray.push({element:item, color:typeColors[item]})
    }
  }

}
