import { Injectable } from '@angular/core';
import { App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {

  constructor(public appCtrl: App, public storage: Storage, public locationTracker: LocationTrackerProvider, public toast: ToastController) {
    console.log('Hello CommonServiceProvider Provider');
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  logout() {
    this.locationTracker.stopTracking();
    this.storage.remove("isLoggedIn");
    this.storage.remove("device_id");
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
