import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ShipmentServiceProvider } from '../../providers/shipment-service/shipment-service';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

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
  items: Array<{
    item_name: string,
    item_desc: string,
    item_length: number,
    item_width: number,
    item_height: number,
    item_dimension_unit: string,
    item_kubikasi: number,
    item_kubikasi_unit: string,
    item_weight: number,
    item_weight_unit: string
  }>;
  nama: string;
  keterangan: string;

  map: any;
  marker: any;
  lat: any;
  lng: any;
  center_from: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shipmentService: ShipmentServiceProvider, public menu: MenuController, private googleMaps: GoogleMaps) {
    this.items = [];
    this.menu.swipeEnable(false);

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

    this.lat = item.location_from_lat;
    this.lng = item.location_from_lng;
    this.center_from = {lat: this.lat, lng: this.lng};
    
    this.loadItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.loadMap();
  }

  loadItem() {
    this.shipmentService.load(this.id)
      .then(data => {
        var iLength = data.length;
        for (var i = 0; i < iLength; i++) {
          var each = data[i];
          var item = {
            item_name: each.item_name,
            item_desc: each.item_desc,
            item_length: each.item_length,
            item_width: each.item_width,
            item_height: each.item_height,
            item_dimension_unit: each.item_dimension_unit,
            item_kubikasi: each.item_kubikasi,
            item_kubikasi_unit: each.item_kubikasi_unit,
            item_weight: each.item_weight,
            item_weight_unit: each.item_weight_unit
          }
          this.items.push(item);
        }
      });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById("map");
    let map: GoogleMap = this.googleMaps.create(element);
    alert(map);
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      
    });
  }

}
