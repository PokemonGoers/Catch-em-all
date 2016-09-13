import { Component, Input } from '@angular/core';
import { Pokemon } from "../../models/pokemon";

@Component({
  templateUrl: 'components/poke-details/poke-evolution.component.html',
  selector: 'poke-evolution'
})

export class PokeEvolutionComponent {

  @Input("pokemon") pokemon: Pokemon;

  constructor() {
  }

  ngOnInit() {
    console.log(this.pokemon.fleeRate);
  }

}
