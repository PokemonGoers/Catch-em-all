import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: require('./poke-type.component.html'),
  styles: [require('./poke-type.component.scss')],
  selector: 'poke-type',
})

export class PokeTypeComponent implements OnInit {

  @Input() type: string[]
  typeArray: Object[]

  constructor() {
  }

  ngOnInit() {
    const color={
      'fire':'#ff6600',
      'ice':'#66b3ff',
      'poison':'#b30086',
      'flying':'#cc66ff',
      'bug':'#99cc00',
      'grass':'#33cc00',
      'water':'#3399ff',
      'ground':'#b35900',
      'rock':'#663300',
      'fighting':'#f53d3d',
      'steel':'#d6d6c2',
      'dragon':'#3333cc',
      'fairy':'#ff99ff',
      'dark':'#73264d',
      'ghost':'#9933ff',
      'psychic':'#ff6699',
      'electric':'#ffcc00',
      'normal':'#8a8a5c'
    }
    this.typeArray = []
    for (let item of this.type){
      this.typeArray.push({element:item, color:color[item]})
    }
  }

}
