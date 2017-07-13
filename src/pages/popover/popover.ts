import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
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

  constructor(public viewCtrl: ViewController, public dialogs: Dialogs, public commonService: CommonServiceProvider) {
    this.items = [
      {name: "logout", text: "Logout"}
    ];
  }

  showConfirm() {
    this.viewCtrl.dismiss();
    this.dialogs.confirm("Yakin ingin logout?", "Logout", ["Ya", "Tidak"]).then((index) => {
      if (index == 1) {
        this.commonService.logout();
      }
    });
  }
  
}
