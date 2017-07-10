import { Component } from '@angular/core';
import { IonicPage, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
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

  constructor(public viewCtrl: ViewController, public appCtrl: App, public storage: Storage, public locationTracker: LocationTrackerProvider) {
    this.items = [
      {name: "logout", text: "Logout"}
    ];
  }

  close() {
    this.locationTracker.stopTracking();
    this.viewCtrl.dismiss();
    this.storage.remove("isLoggedIn");
    this.storage.remove("device_id");
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

}
