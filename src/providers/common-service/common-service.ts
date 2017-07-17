import { Injectable } from '@angular/core';
import { App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {
  toast: any;

  constructor(public appCtrl: App, public storage: Storage, public locationTracker: LocationTrackerProvider, public toastCtrl: ToastController, public nativeStorage: NativeStorage) {
    console.log('Hello CommonServiceProvider Provider');
  }

  presentToast(message) {
    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: "bottom"
    });
    this.toast.present();
  }

  getItemFromStorage(key) {
    this.nativeStorage.getItem(key).then((value) => {
      alert(value);
    }, (err) => {
      alert(JSON.stringify(err));
    });
  }

  logout() {
    this.locationTracker.stopTracking();
    this.storage.remove("isLoggedIn");
    this.storage.remove("device_id");
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
