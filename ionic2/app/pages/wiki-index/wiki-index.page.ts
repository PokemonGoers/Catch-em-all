import {forwardRef, OnInit, OnDestroy} from "@angular/core";
import {NavController, Page} from "ionic-angular";
import {Subscription} from "rxjs";
import {PokeDetailPage} from "../poke-detail/poke-detail.page";
import {Pokemon} from "../../models/pokemon";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ApiService} from "../../services/api.service";

@Page({
  template: require('./wiki-index.page.html'),
  styles: [require('./wiki-index.page.scss')],
  directives: [forwardRef(() => NavbarComponent)]
})
export class WikiIndexPage implements OnInit, OnDestroy {

  queryString: string;
  querySubscription: Subscription;
  results: Pokemon[] = [];

  constructor(private navCtrl: NavController, private apiservice: ApiService) { }

  ngOnInit() {
    this.querySubscription = this.apiservice.getAllPokemon()
        .subscribe(results => this.results = results, error => this.results = []);
  }

  onInput() {
    this.cancelRequests();
    if(this.queryString === '') {
      this.querySubscription = this.apiservice.getAllPokemon()
        .subscribe(results => this.results = results, error => this.results = []);
    } else {
      this.querySubscription = this.apiservice.getPokemonByName(this.queryString)
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

  ngOnDestroy() {
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
