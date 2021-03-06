import { Injectable } from '@angular/core';

const types = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water'
];

const typeColors = {
  'bug': '#99cc00',
  'dark': '#73264d',
  'dragon' :'#3333cc',
  'electric': '#ffcc00',
  'fairy': '#cc99ff',
  'fighting': '#cc0000',
  'fire': '#ff6600',
  'flying': '#cc66ff',
  'ghost': '#9933ff',
  'grass': '#66ff33',
  'ground': '#ff9933',
  'ice': '#33ccff',
  'normal': '#8a8a5c',
  'poison': '#b30086',
  'psychic': '#ff6699',
  'rock': '#994d00',
  'steel': '#808080',
  'water': '#3399ff'
}

@Injectable()
export class TypeService {
    get types () { return types; }
    get typeColors () { return typeColors; }
}
