import { Page, NavController } from 'ionic-angular';
import { PEOPLE } from './about-people';

@Page({
  templateUrl: 'pages/about/about.page.html',
})
export class AboutPage {
  people: Object

  constructor(private navCtrl: NavController) {
      this.people = PEOPLE;
  }

}
