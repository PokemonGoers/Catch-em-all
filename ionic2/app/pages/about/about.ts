import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LIST } from './../../app-menu.component';

@Component({
  templateUrl: 'pages/about/about.html',
})
export class AboutPage {
  items : any

  constructor(private navCtrl: NavController) {

  }

  ngOnInit(): void {
      this.getList().then(items => this.items = items)
  }

  getList(): Promise<any[]> {
    return Promise.resolve(LIST)
  }

  onSelect(item: any): void {
    console.log(item.link);
  }

}
