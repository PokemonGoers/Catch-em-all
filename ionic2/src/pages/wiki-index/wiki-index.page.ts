import { forwardRef } from '@angular/core';
import { NavController, Page } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { PokeDetailPage } from '../poke-detail/poke-detail.page';
import { Pokemon } from '../../models/pokemon';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { RarityBadgeComponent } from '../../components/rarity-badge/rarity-badge.component';

@Page({
  template: require('./wiki-index.page.html'),
  styles: [require('./wiki-index.page.scss')],
  directives: [
    forwardRef(() => NavbarComponent),
    RarityBadgeComponent
  ]
})
export class WikiIndexPage {

  queryString: string;
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

  cancelRequests() {
    if (this.querySubscription && !this.querySubscription.isUnsubscribed) {
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
