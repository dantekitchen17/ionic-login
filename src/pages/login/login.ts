import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
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
  loader: any;
  username: string;
  password: string;
  toast: any;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public storage: Storage, private device: Device, public platform: Platform, public http: Http, public loading: LoadingController, private toastCtrl: ToastController) {
    console.log(device.manufacturer + "\n" + device.model + "\n" + device.platform + "\n" + device.serial + "\n" + device.uuid + "\n" + device.version);
    this.menu.enable(false);
    this.platform.registerBackButtonAction(() => {
      this.platform.exitApp();
    });

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

  presentToast(text) {
    if (this.toast) {
      this.toast.dismiss();
    }
    this.toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: "bottom"
    });
    this.toast.present();
  }

  doLogin() {
    this.loader = this.loading.create({
      content: "mohon menunggu..."
    });
    this.loader.present();

    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({headers: headers});
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("username", this.username);
    urlSearchParams.append("password", this.password);
    let body = urlSearchParams.toString();
    this.http.post("https://dantekitchen17.000webhostapp.com/api/login", body, options)
      .subscribe(data => {
        if (data.status == 200) {
          if (data.text() == "success") {
            this.storage.set("isLoggedIn", true);
            this.navCtrl.setRoot(SetDeviceNumberPage);
          } else {
            this.presentToast("Username / Password salah");
          }
        } else {
          this.presentToast("Tidak bisa terhubung dengan server");
        }
        this.loader.dismiss();
    });
  }
}
