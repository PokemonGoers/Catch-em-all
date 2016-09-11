import { Page, NavController } from 'ionic-angular';
import { Navbar } from '../../components/navbar/navbar.component';

@Page({
  templateUrl: 'pages/about/about.page.html',
  directives: [Navbar]
})
export class AboutPage {

  constructor(private navCtrl: NavController) {

  }

}
