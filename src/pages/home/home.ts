import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';
import { PopoverPage } from '../popover/popover';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DriverServiceProvider]
})

export class HomePage {
  status_array: {
    "2": string,
    "3": string,
    "4": string,
    "5": string
  };

  items: Array<{
    id: number,
    shipment_title: string,
    shipment_information: string,
    shipment_length: number,
    shipment_status: number,
    status_array: any,
    status_text: string,
    additional_class: string,
    location_from_address: string,
    location_from_city: string,
    location_from_lat: number,
    location_from_lng: number,
    location_to_address: string,
    location_to_city: string,
    location_to_lat: number,
    location_to_lng: number,
    driver_name: string
  }>;
  loader: any;
  emptyState: boolean;
  errorState: boolean;

  refreshAfterBack: boolean = false;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public popoverCtrl: PopoverController, public driverService: DriverServiceProvider, public loading: LoadingController, public storage: Storage, public locationTracker: LocationTrackerProvider, public backgroundMode: BackgroundMode, public appMinimize: AppMinimize, private platform: Platform, public commonService: CommonServiceProvider, public dialogs: Dialogs) {
    this.menu.enable(true);
    
    this.platform.registerBackButtonAction(() => {
      if (this.navCtrl.canGoBack()) {
        this.navCtrl.pop();
      } else {
        this.appMinimize.minimize();
      }
    });

    this.backgroundMode.on("activate").subscribe(() => {
      this.backgroundMode.disableWebViewOptimizations();
    });
    this.backgroundMode.enable();
    this.backgroundMode.setDefaults({
      title: "Yukirim",
      text: "is running in background",
      resume: true
    });

    this.items = [];

    this.emptyState = false;
    this.errorState = false;
    this.status_array = {
      "2": "Pesanan",
      "3": "Dikirim",
      "4": "Diambil",
      "5": "Diterima"
    };

    this.startTracking();
  }

  ionViewDidLoad() {
    this.loader = this.loading.create({
      content: "sedang refresh data..."
    });
    this.loader.present();
    this.loadItems();
    
    /*this.items = [
      {id: 1, shipment_title: "Kirim furniture", location_from_city: "Surabaya", location_to_city: "Jakarta"},
      {id: 2, shipment_title: "kitchen furniture", location_from_city: "Surabaya", location_to_city: "Malang"},
      {id: 3, shipment_title: "Bedroom Set", location_from_city: "Jakarta", location_to_city: "Bali"}
    ];*/
  }

  ionViewDidEnter() {
    if (this.refreshAfterBack) {
      this.refreshAfterBack = false;
      this.loader = this.loading.create({
        content: "sedang refresh data..."
      });
      this.loader.present();
      this.loadItems(null, true);
    }
  }

  startTracking() {
    this.locationTracker.startTracking();
  }

  stopTracking() {
    this.locationTracker.stopTracking();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev
    });
  }

  loadItems(refresher = null, reload = false) {
    this.driverService.load(reload)
      .then(result => {
        if (refresher) {
          refresher.complete();
        }

        if (this.loader) {
          this.loader.dismiss();
        }
        
        if (result.status == "success") {
          this.errorState = false;
          var iLength = result.data.length;

          for (var i = 0; i < iLength; i++) {
            var item = result.data[i];
            this.items = [
              {
                id: item.shipment_id,
                shipment_title: item.shipment_title,
                shipment_information: item.shipment_information,
                shipment_length: parseInt(item.shipment_length),
                shipment_status: item.shipment_status,
                status_array: this.status_array,
                status_text: this.status_array[item.shipment_status + ""],
                additional_class: "badge-status-" + this.status_array[item.shipment_status + ""],
                location_from_address: item.location_from_address,
                location_from_city: item.location_from_city,
                location_from_lat: item.location_from_lat,
                location_from_lng: item.location_from_lng,
                location_to_address: item.location_to_address,
                location_to_city: item.location_to_city,
                location_to_lat: item.location_to_lat,
                location_to_lng: item.location_to_lng,
                driver_name: item.driver_name
              }
            ];
          }

        } else if (result.status == "device_not_found") {
          this.commonService.logout();
        } else {
          this.errorState = true;
          this.commonService.presentToast(result.errorName + ": " + result.errorMessage);
        }

        if (this.items.length == 0) {
          this.emptyState = true;
        } else {
          this.emptyState = false;
        }
      });
  }

  refreshData(refresher) {
    this.loadItems(refresher, true);
  }

  itemClick(event, item) {
    this.dialogs.prompt("Masukkan nama anda : ", "Nama Supir", ["OK", "Batal"], "").then((results) => {
      if (results.buttonIndex == 1) {
        if (this.items[0].driver_name.toLowerCase() == results.input1.toLowerCase()) {
          this.navCtrl.push(DetailPage, {
            item: item,
            callback: this.callbackFunction
          });
        } else {
          this.dialogs.alert(results.input1 + " bukan supir untuk pengiriman ini", "");
        }
      }
    });
  }

  callbackFunction = (refresh) => {
    return new Promise((resolve, reject) => {
      this.refreshAfterBack = refresh;
      resolve;
    });
  }
}
