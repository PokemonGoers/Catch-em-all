import { forwardRef } from '@angular/core';
import { Page, NavController, NavParams } from 'ionic-angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Page({
  templateUrl: 'pages/wiki/wiki.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class WikiPage {

  pokemonId: number;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.pokemonId = navParams.get('pokemonId');
    console.log('pokemonId', this.pokemonId);
  }

}
