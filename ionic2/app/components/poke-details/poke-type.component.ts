import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: 'components/poke-details/poke-type.component.html',
  selector: 'poke-type',
  styles: [`
    .rounded-edges{
      border-radius: 5px;
      border: solid black 1px;
      text-align: center;
      color: white;
      width: 20vw;
      height: 5vw;
      text-transform: uppercase;
      background-color: black;
      text-shadow: 1px 1px grey;
    }
    `]
})

export class PokeTypeComponent implements OnInit{
  @Input('type') type:string
  typearray:Object[]

  constructor() {
  }

  ngOnInit(){
    const secondaryarray=this.type[0].split(', ')
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
    var newarray=[];
    var indexCount=0;
    secondaryarray.forEach((item, index, array) =>{
      newarray.push({element:item,color:color[item+'']})
      indexCount++;
      if(indexCount==array.length){
        this.typearray=newarray
      }
    })
    //this.typearray=newarray
  }
}
