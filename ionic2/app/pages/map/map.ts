import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LIST } from './../../app-menu.component';

@Component({
  templateUrl: 'pages/map/map.html'
})
export class MapPage implements OnInit{
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
