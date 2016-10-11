import { Injectable } from '@angular/core';
import { ProjectGroup } from '../models/project-group'

@Injectable()
export class PeopleService {

    constructor() { }

    static getProjectGroups(): ProjectGroup[] {
      return PEOPLE;
    }

}

export const PEOPLE: ProjectGroup[] = [
  {
    alias: 'Pokémon Legends',
    member:[
      {name:'Dr. Lothar Richter',link:'https://rostlab.org'},
      {name:'Timothy Karl',link:'https://rostlab.org'},
      {name:'Prof. Burkhard Rost',link:'https://rostlab.org'}
    ],
  },
  {
    alias: 'Pokémon Trainer',
    member:[
      {name:'Dr. Guy Yachdav',link:'https://www.linkedin.com/in/gyachdav'},
      {name:'Dr. Tatyana Goldberg',link:'https://rostlab.org/~goldberg'},
      {name:'Christian Dallago',link:'http://christian.dallago.us'},
      {name:'Juan Miguel Cejuela',link:'https://tagtog.net'}
    ]},
  {
    alias: 'Pokémon Data Analysts',
    member:[
      {name:'Annette Köhler',link:'#'},
      {name:'Fabian Buske',link:'#'},
      {name:'Jonas Heintzenberg',link:'#'},
      {name:'Samit Vaidya',link:'#'},
      {name:'Swathi S Sunder',link:'#'},
      {name:'Vivek Sethia',link:'#'}
    ]},
  {
    alias: 'Pokémon Clairvoyants',
    member:[
      {name:'Aurel Roci',link:'#'},
      {name:'Benjamin Strobel',link:'#'},
      {name:'Marcel Wagenländer',link:'#'},
      {name:'Matthias Baur',link:'#'},
      {name:'Siamion Karcheuski',link:'#'},
      {name:'Timur Khodzhaev',link:'#'}
    ]},
  {
    alias: 'Pokémon Whisperer',
    member:[
      {name:'Amr Abdelraouf',link:'#'},
      {name:'Hannes Dorfmann',link:'#'},
      {name:'Karen Reyna',link:'#'},
      {name:'Philipp Dowling',link:'#'}
    ]},
  {
    alias: 'Pokémon Cartographers',
    member:[
      {name:'Elma Gazetic',link:'#'},
      {name:'Faris Cakaric',link:'#'},
      {name:'Gani Qinami',link:'#'},
      {name:'Oleksandr Fedotov',link:'#'},
      {name:'Paul Gualotuna',link:'#'},
      {name:'Timo Ludwig',link:'#'}
    ]},
  {
    alias: 'Pokémon Catcher',
    member:[
      {name:'Alexander Lill',link:'#'},
      {name:'Georgi Aylov',link:'#'},
      {name:'Gilles Tanson',link:'#'},
      {name:'Jochen Hartl',link:'#'},
      {name:'Josef Brandl',link:'#'},
      {name:'Mustafa Kaptan',link:'#'},
      {name:'Philippe Buschmann',link:'#'},
      {name:'Wolfgang Hobmaier',link:'#'}
    ]
  }
]

