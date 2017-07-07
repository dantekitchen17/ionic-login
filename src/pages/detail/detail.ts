import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ShipmentServiceProvider } from '../../providers/shipment-service/shipment-service';

declare var google;
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
    status: number,
    status_array: any,
    status_text: string,
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
  status_text: string;

  map: any;
  marker: any;
  location_from_lat: any;
  location_from_lng: any;
  location_to_lat: any;
  location_to_lng: any;
  center_from: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shipmentService: ShipmentServiceProvider, public menu: MenuController) {
    this.items = [];
    this.menu.swipeEnable(false);

    var item = navParams.get("item");
    this.id = item.id;
    this.detail = {
      nama: item.shipment_title,
      keterangan: item.shipment_information,
      status: item.shipment_status,
      status_array: item.status_array,
      status_text: item.status_text,
      berakhir: item.shipment_end_date,
      cara_pesan: item.order_type,
      lokasi_asal: item.location_from_address,
      lokasi_tujuan: item.location_to_address
    };

    this.location_from_lat = item.location_from_lat;
    this.location_from_lng = item.location_from_lng;
    this.location_to_lat = item.location_to_lat;
    this.location_to_lng = item.location_to_lng;
    
    this.loadItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.loadMap();
    this.disableMapTouchMove();
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

  disableMapTouchMove() {
    var mapElement = document.getElementById("map");
    mapElement.addEventListener("touchmove", function(e) {
      return false;
    });
  }

  mapsOnClick() {
    window.open('https://www.google.com/maps/dir/' + this.location_from_lat + ',' + this.location_from_lng + "/" + this.location_to_lat + "," + this.location_to_lng, '_system');
  }

  loadMap() {
    
    var coor = {lat: -25.363, lng: 131.044};
    this.map = new google.maps.Map(document.getElementById("map"), {
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: false,
      gestureHandling: "none"
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: new google.maps.LatLng(this.location_from_lat, this.location_from_lng),
      destination: new google.maps.LatLng(this.location_to_lat, this.location_to_lng),
      travelMode: "DRIVING"
    }, function(response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        alert(status);
      }
    });
  }
}
