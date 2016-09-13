import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { forwardRef } from '@angular/core';
import { Page, NavController, NavParams } from 'ionic-angular';

@Page({
  templateUrl: 'pages/wiki-index/wiki-index.page.html',
  directives: [forwardRef(() => NavbarComponent)]
})
export class WikiIndexPage {

  constructor(private navCtrl: NavController, navParams: NavParams) { }

}
