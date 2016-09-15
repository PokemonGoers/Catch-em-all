import {forwardRef} from "@angular/core";
import {NavController, Page} from "ionic-angular";
import {Subscription} from "rxjs";
import {PokeDetailPage} from "../poke-detail/poke-detail.page";
import {Pokemon} from "../../models/pokemon";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ApiService} from "../../services/api.service";

@Page({
  templateUrl: 'pages/wiki-index/wiki-index.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class WikiIndexPage {

  queryString: string;
  querySubscription: Subscription;
  results: Pokemon[] = [];

  constructor(private navCtrl: NavController, private apiservice: ApiService) { }

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
