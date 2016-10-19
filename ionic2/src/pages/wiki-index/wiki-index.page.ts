import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { PokeDetailPage } from '../poke-detail/poke-detail.page';
import { Pokemon } from '../../models/pokemon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'wiki-index-page',
  templateUrl: './wiki-index.page.html'
})
export class WikiIndexPage {

  queryString: string = '';
  querySubscription: Subscription;
  results: Pokemon[] = [];

  constructor(private navCtrl: NavController, private apiService: ApiService) { }

  ionViewDidEnter() {
    if(this.queryString === ''||this.queryString===undefined) {
      this.querySubscription = this.apiService.getAllPokemon()
        .subscribe(results => this.results = results, error => this.results = []);
    } else {
      this.querySubscription = this.apiService.getPokemonByName(this.queryString)
        .subscribe(results => this.results = results, error => this.results = []);
    }
  }

  onInput() {
    this.cancelRequests();
    if(this.queryString === '') {
      this.querySubscription = this.apiService.getAllPokemon()
        .subscribe(results => this.results = results, error => this.results = []);
    } else {
      this.querySubscription = this.apiService.getPokemonByName(this.queryString)
        .subscribe(results => this.results = results, error => this.results = []);
    }
  }

  onCancel() {
    this.cancelRequests();
  }

  cancelRequests() {
    if (this.querySubscription && !this.querySubscription.closed) {
      this.querySubscription.unsubscribe();
    }
  }

  selectPokemon(pokemon: Pokemon) {
    this.cancelRequests();
    this.navCtrl.push(PokeDetailPage, {pokemon: pokemon});
  }

  ionViewDidUnload() {
    this.cancelRequests();
  }

  onSearch() {
    // Triggered when the confirm button (e.g. enter) is pressed.
    // If there is exactly one search result we will select
    if (this.results.length === 1) {
      this.selectPokemon(this.results[0]);
    }
  }

}
