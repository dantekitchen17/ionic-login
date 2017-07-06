import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';
import { PopoverPage } from '../popover/popover';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';

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
  driver_id: number;
  items: Array<{
    id: number,
    shipment_title: string,
    shipment_information: string,
    shipment_length: number,
    location_from_address: string,
    location_from_city: string,
    location_from_lat: number,
    location_from_lng: number,
    location_to_address: string,
    location_to_city: string,
    location_to_lat: number,
    location_to_lng: number
  }>;
  loader: any;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public popoverCtrl: PopoverController, public driverService: DriverServiceProvider, public loading: LoadingController, public storage: Storage) {
    this.menu.enable(true);
  }

  ionViewDidLoad() {
    this.loader = this.loading.create({
      content: "sedang refresh data..."
    });
    this.loader.present();

    this.storage.get("driver_id").then((value) => {
      this.driver_id = value;
      this.loadItems();
    });
    
    /*this.items = [
      {id: 1, shipment_title: "Kirim furniture", location_from_city: "Surabaya", location_to_city: "Jakarta"},
      {id: 2, shipment_title: "kitchen furniture", location_from_city: "Surabaya", location_to_city: "Malang"},
      {id: 3, shipment_title: "Bedroom Set", location_from_city: "Jakarta", location_to_city: "Bali"}
    ];*/
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev
    });
  }

  loadItems(refresher = null) {
    this.driverService.load(refresher)
      .then(data => {
        if (refresher) {
          refresher.complete();
        }

        var iLength = data.length;
        for (var i = 0; i < iLength; i++) {
          var item = data[i];
          this.items = [
            {
              id: item.shipment_id,
              shipment_title: item.shipment_title,
              shipment_information: item.shipment_information,
              shipment_length: parseInt(item.shipment_length),
              location_from_address: item.location_from_address,
              location_from_city: item.location_from_city,
              location_from_lat: item.location_from_lat,
              location_from_lng: item.location_from_lng,
              location_to_address: item.location_to_address,
              location_to_city: item.location_to_city,
              location_to_lat: item.location_to_lat,
              location_to_lng: item.location_to_lng
            }
          ];
        }
        if (this.loader) {
          this.loader.dismiss();
        }
      });
  }

  refreshData(refresher) {
    this.loadItems(refresher);
  }

  itemClick(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }
}
