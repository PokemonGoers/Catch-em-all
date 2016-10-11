import {Component, Input, OnInit} from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { ApiService } from '../../services/api.service';
import { NavController } from 'ionic-angular';
import { PokeDetailPage } from '../../pages/poke-detail/poke-detail.page';

@Component({
  template: require('./evolutions.component.html'),
  styles: [require('./evolutions.component.scss')],
  selector: 'poke-evolutions'
})

export class EvolutionsComponent implements OnInit {

  @Input() pokemon: Pokemon;

  public prevPokemons: Pokemon[] = [];
  public nextPokemons: Pokemon[] = [];

  constructor(private apiservice: ApiService, private navCtrl: NavController) {
  }

  ngOnInit() {

    for (let evolution of this.pokemon.previousEvolutions) {
      this.apiservice.getPokemonById(evolution.pokemonId)
        .subscribe(results => this.prevPokemons.push(results), error => console.log(error));
    }

    for (let evolution of this.pokemon.nextEvolutions) {
      this.apiservice.getPokemonById(evolution.pokemonId)
        .subscribe(results => this.nextPokemons.push(results), error => console.log(error));
    }

  }

  selectPokemon(pokemon:Pokemon) {
    this.navCtrl.push(PokeDetailPage, {pokemon: pokemon});
  }

}
