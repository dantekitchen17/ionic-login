import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';

/**
 * Generated class for the SetDeviceNumberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-set-device-number',
  templateUrl: 'set-device-number.html',
})
export class SetDeviceNumberPage {
  id: string;
  btnDisabled: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public storage: Storage, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetDeviceNumberPage');
  }

  onInput(event) {
    if (this.id !== "") {
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
    }
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev
    });
  }

  showConfirm() {
    let confirm = this.alert.create({
      title: "Konfirmasi",
      message: "Nomor device " + this.id + " ?",
      buttons: [
        {
          text: "Ya",
          handler: () => {
            this.storage.set("device_id", this.id);
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: "Tidak",
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  }
}
