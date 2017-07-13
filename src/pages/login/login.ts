import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

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
  email: string;
  password: string;
  toast: any;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public storage: Storage, private device: Device, public platform: Platform, public http: Http, public loading: LoadingController, private toastCtrl: ToastController) {
    this.menu.enable(false);
    this.platform.registerBackButtonAction(() => {
      this.platform.exitApp();
    });

    storage.get("isLoggedIn").then((val) => {
      if (val != null) {
        this.navCtrl.setRoot(HomePage);
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
    urlSearchParams.append("email", this.email);
    urlSearchParams.append("password", this.password);
    let body = urlSearchParams.toString();
    this.http.post("https://dantekitchen17.000webhostapp.com/api/login", body, options)
      .subscribe(data => {
        if (data.status == 200) {
          var result = JSON.parse(data.text());
          if (result.result == "success") {
            this.storage.set("isLoggedIn", true);
            this.storage.set("device_id", result.device_id);
            this.storage.set("token", result.generated_token);
            this.navCtrl.setRoot(HomePage);
          } else {
            this.presentToast("Email / Password / Device ID salah");
          }
        } else {
          this.presentToast("Tidak bisa terhubung dengan server");
        }
        this.loader.dismiss();
    });
  }
}
