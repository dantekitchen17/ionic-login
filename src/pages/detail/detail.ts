import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShipmentServiceProvider } from '../../providers/shipment-service/shipment-service';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  id: number;
  detail: {
    nama: string,
    keterangan: string,
    berakhir: string,
    cara_pesan: string,
    lokasi_asal: string,
    lokasi_tujuan: string
  };
  nama: string;
  keterangan: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shipmentService: ShipmentServiceProvider) {
    var item = navParams.get("item");
    this.id = item.id;
    this.detail = {
      nama: item.shipment_title,
      keterangan: item.shipment_information,
      berakhir: item.shipment_end_date,
      cara_pesan: item.order_type,
      lokasi_asal: item.location_from_address,
      lokasi_tujuan: item.location_to_address
    };
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  loadItem() {
    this.shipmentService.load(this.id)
      .then(data => {
        var iLength = data.length;
        for (var i = 0; i < iLength; i++) {
          
        }
      });
  }

}
