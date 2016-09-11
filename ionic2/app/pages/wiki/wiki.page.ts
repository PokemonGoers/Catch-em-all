import { Page, NavController } from 'ionic-angular';
import { Navbar } from '../../components/navbar/navbar.component';

@Page({
  templateUrl: 'pages/wiki/wiki.page.html',
  directives: [Navbar]
})
export class WikiPage {

  constructor(private navCtrl: NavController) {

  }

}
