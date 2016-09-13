import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable, Subscription} from 'rxjs';
import { ApiService } from '../../services/api.service'

@Component({
  templateUrl: 'build/pages/wiki-index/wiki-index.page.html',
})
export class WikiIndexPage {

  queryString: String;
  querySubscription: Subscription;

  constructor(private navCtrl: NavController, private apiservice: ApiService) {}

  onSearch() {

  }

}
