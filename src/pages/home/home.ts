import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'

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
  items: Array<{id: number, shipment_title: string, location_from_city: string, location_to_city: string}>;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public driverService: DriverServiceProvider) {
    this.menu.enable(true);
    this.driver_id = 6;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //this.loadItems();
    this.items = [
      {id: 1, shipment_title: "Kirim furniture", location_from_city: "Surabaya", location_to_city: "Jakarta"},
      {id: 2, shipment_title: "kitchen furniture", location_from_city: "Surabaya", location_to_city: "Malang"},
      {id: 3, shipment_title: "Bedroom Set", location_from_city: "Jakarta", location_to_city: "Bali"}
    ];
  }

  loadItems() {
    this.driverService.load()
      .then(data => {
        alert(data);
      });
  }

  itemClick(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }
}
