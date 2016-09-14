import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { forwardRef } from '@angular/core';
import { Page, NavController, NavParams } from 'ionic-angular';
import { Pokemon } from "../../models/pokemon";
import { PokeDetailPage } from "../pokedetail/pokedetail.page";

@Page({
  templateUrl: 'pages/wiki-index/wiki-index.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class WikiIndexPage {

  queryString: string;
  querySubscription: Subscription;
  results: Pokemon[] = [];

  constructor(private navCtrl: NavController, navParams: NavParams, private apiservice: ApiService) { }

  onInput($event) {
    this.cancelRequests();
      // Search Pokemon
      this.querySubscription = this.apiservice.getPokemonByName(this.queryString)
        .subscribe(results => this.results = results, error => this.results = []);
  }

  cancelRequests() {
    if (this.querySubscription && !this.querySubscription.isUnsubscribed) {
      this.querySubscription.unsubscribe();
    }
  }

  selectPokemon(pokemon:Pokemon) {
    this.cancelRequests();
    this.navCtrl.setRoot(PokeDetailPage, {pokemonId: pokemon.pokemonId});
  }


}
