import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public storage: Storage) {
    this.menu.enable(false);

    storage.get("isLoggedIn").then((val) => {
      if (val != null) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.storage.set("isLoggedIn", true);
    this.storage.set("driver_id", 6);

    this.navCtrl.setRoot(HomePage);
  }
}
