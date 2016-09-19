import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: require('./poke-type.component.html'),
  selector: 'poke-type',
})

export class PokeTypeComponent implements OnInit{

  @Input('type') type:string[]
  typeArray:Object[]

  constructor() {
  }

  ngOnInit(){
    const color={
      'fire':'#ff6600',
      'ice':'#cce6ff',
      'poison':'#b30086',
      'flying':'#cc66ff',
      'bug':'#99cc00',
      'grass':'#66ff33',
      'water':'#3399ff',
      'ground':'#ffcc66',
      'rock':'#cc8800',
      'fight':'#cc0000',
      'steel':'#d6d6c2',
      'dragon':'#3333cc',
      'fairy':'#cc99ff',
      'dark':'#73264d',
      'ghost':'#9933ff',
      'psychic':'#ff6699',
      'electric':'#ffff33',
      'normal':'#8a8a5c'
    }
    this.typeArray = []
    for (let item of this.type){
      this.typeArray.push({element:item, color:color[item]})
    }
  }
}
