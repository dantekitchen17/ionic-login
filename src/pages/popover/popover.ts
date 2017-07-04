import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  items: Array<{
    name: string,
    text: string
  }>;

  constructor(public viewCtrl: ViewController, public nav: NavController) {
    this.items = [
      {name: "logout", text: "Logout"}
    ];
  }

  close($ev, item) {
    this.viewCtrl.dismiss();
    if (item.name == "logout") {
      this.nav.setRoot(LoginPage);
    }
  }

}
