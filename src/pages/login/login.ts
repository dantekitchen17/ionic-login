import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { SetDeviceNumberPage } from '../set-device-number/set-device-number';

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
  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public storage: Storage, private device: Device) {
    console.log(device.manufacturer + "\n" + device.model + "\n" + device.platform + "\n" + device.serial + "\n" + device.uuid + "\n" + device.version);
    this.menu.enable(false);

    storage.get("isLoggedIn").then((val) => {
      if (val != null) {
        storage.get("device_id").then((device_id) => {
          if (device_id != null) {
            this.navCtrl.setRoot(HomePage);
          } else {
            this.navCtrl.setRoot(SetDeviceNumberPage);
          }
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.storage.set("isLoggedIn", true);
    this.navCtrl.setRoot(SetDeviceNumberPage);
  }
}
