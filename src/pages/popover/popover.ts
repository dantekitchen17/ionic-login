import { Component } from '@angular/core';
import { IonicPage, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Dialogs } from '@ionic-native/dialogs';
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

  constructor(public viewCtrl: ViewController, public appCtrl: App, public storage: Storage, public locationTracker: LocationTrackerProvider, public dialogs: Dialogs) {
    this.items = [
      {name: "logout", text: "Logout"}
    ];
  }

  close() {
    this.locationTracker.stopTracking();
    this.storage.remove("isLoggedIn");
    this.storage.remove("device_id");
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  showConfirm() {
    this.viewCtrl.dismiss();
    this.dialogs.confirm("Yakin ingin logout?", "Logout", ["Ya", "Tidak"]).then((index) => {
      if (index == 1) {
        this.close();
      }
    });
  }
}
