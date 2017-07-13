import { Component, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ShipmentServiceProvider } from '../../providers/shipment-service/shipment-service';
import { CommonServiceProvider } from '../../providers/common-service/common-service';

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
  @ViewChild("content") content;
  @ViewChild("slider") slider;
  
  callback: any;
  loader: any;
  loaded: boolean = false;

  device_id: number;
  id: number;
  detail: {
    nama: string,
    keterangan: string,
    status: number,
    status_array: any,
    status_text: string,
    additional_class: string,
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
  status_text_next: string;

  currentLocation: any = null;
  map: any;
  marker: any;
  directionsService: any;
  directionsDisplay: any;
  location_from_lat: any;
  location_from_lng: any;
  location_to_lat: any;
  location_to_lng: any;
  center_from: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shipmentService: ShipmentServiceProvider, public menu: MenuController, public renderer2: Renderer2, public storage: Storage, public platform: Platform, public loading: LoadingController, public commonService: CommonServiceProvider) {

    this.items = [];
    this.menu.swipeEnable(false);
    storage.get("device_id").then((value) => {
      this.device_id = value;
    });

    this.callback = navParams.get("callback");
    var item = navParams.get("item");
    this.id = item.id;
    this.detail = {
      nama: item.shipment_title,
      keterangan: item.shipment_information,
      status: item.shipment_status,
      status_array: item.status_array,
      status_text: item.status_text,
      additional_class: item.additional_class,
      berakhir: item.shipment_end_date,
      cara_pesan: item.order_type,
      lokasi_asal: item.location_from_address,
      lokasi_tujuan: item.location_to_address
    };

    this.status_text_next = this.detail.status_array[(parseInt(this.detail.status + "") + 1).toString()];

    this.location_from_lat = item.location_from_lat;
    this.location_from_lng = item.location_from_lng;
    this.location_to_lat = item.location_to_lat;
    this.location_to_lng = item.location_to_lng;

    this.loadItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  ngAfterViewInit() {
    this.getMyLocationAndSetMap();

    var nativeElement = this.slider.nativeElement;
    this.renderer2.listen(nativeElement, "touchend", (evt) => {
      if (nativeElement.value == nativeElement.max) {
        this.submit();
      } else {
        nativeElement.value = 0;
      }
    });
  }

  getMyLocationAndSetMap() {
    this.storage.get("location").then((value) => {
      this.currentLocation = value;
      this.loadMap();
      this.disableMapTouchMove();
    });
  }

  submit() {
    this.loader = this.loading.create({
      content: "submitting data..."
    });
    this.loader.present();

    var url = "";
    if (this.detail.status == 2) {
      url = "https://dantekitchen17.000webhostapp.com/api/submit-kirim";
    } else if (this.detail.status == 3) {
      url = "https://dantekitchen17.000webhostapp.com/api/submit-ambil";
    } else if (this.detail.status == 4) {
      url = "https://dantekitchen17.000webhostapp.com/api/submit-terima";
    }
    
    this.shipmentService.updateShipmentStatus(url, this.id).then((result) => {
      this.loader.dismiss();
      this.slider.nativeElement.value = 0;
      if (result.status == "success") {
        this.callback(true);
        this.detail.status = result.data[0].shipment_status;
        this.detail.status_text = this.detail.status_array[this.detail.status + ""];
        this.detail.additional_class = "badge-status-" + this.detail.status_text;
        this.status_text_next = this.detail.status_array[(parseInt(this.detail.status + "") + 1).toString()];
        this.getMyLocationAndSetMap();
        this.content.scrollToTop();
        this.commonService.presentToast("Sukses update status");
      } else if (result.status == "device_not_found") {
        this.commonService.presentToast("error");
      } else {
        this.commonService.presentToast(result.errorName + ": " + result.errorMessage);
      }
    });
  }

  loadItem() {
    this.shipmentService.load(this.id)
      .then(result => {
        if (result.status == "success") {
          var iLength = result.data.length;
          for (var i = 0; i < iLength; i++) {
            var each = result.data[i];
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

          this.loaded = true;
        } else {
          
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
    if (this.detail.status == 2) {
      window.open('https://www.google.com/maps/dir/' + this.location_from_lat + ',' + this.location_from_lng + "/" + this.location_to_lat + "," + this.location_to_lng, '_system');
    } else if (this.detail.status == 3) {
      window.open('https://www.google.com/maps/dir/Current+Location/' + this.location_from_lat + ',' + this.location_from_lng, '_system');
    } else {
      window.open('https://www.google.com/maps/dir/Current+Location/' + this.location_to_lat + "," + this.location_to_lng, '_system');
    }
  }

  loadMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: false,
      gestureHandling: "none"
    });

    /*if (this.currentLocation != null) {
      let position = {lat: this.currentLocation.lat, lng: this.currentLocation.lng};
      var marker = new google.maps.Marker({
        position: position,
        map: this.map,
        animation: google.maps.animation.DROP
      });
    }*/
    
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var from_lat, from_lng, to_lat, to_lng;
    from_lat = this.currentLocation.lat;
    from_lng = this.currentLocation.lng;

    if (this.detail.status == 2) {
      from_lat = this.location_from_lat;
      from_lng = this.location_from_lng;
      to_lat = this.location_to_lat;
      to_lng = this.location_to_lng;
    } else if (this.detail.status == 3) {
      to_lat = this.location_from_lat;
      to_lng = this.location_from_lng;
    } else {
      to_lat = this.location_to_lat;
      to_lng = this.location_to_lng;
    }

    directionsService.route({
      origin: new google.maps.LatLng(from_lat, from_lng),
      destination: new google.maps.LatLng(to_lat, to_lng),
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
