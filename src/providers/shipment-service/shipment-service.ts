import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';

/*
  Generated class for the ShipmentServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ShipmentServiceProvider {
  data: any;
  device_id: number;
  token: string;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ShipmentServiceProvider Provider');
    this.data = {};
    this.device_id = null;
    this.token = null;
  }

  load(shipment_id: number): any {    
    return new Promise((resolve, reject) => {
      if (this.token != null) {
        this.doLoad(shipment_id).then((value) => {
          resolve(value);
        });
      } else {
        Promise.all([
          this.storage.get("device_id"),
          this.storage.get("token")
        ]).then((value) => {
          this.device_id = value[0];
          this.token = value[1];
          this.doLoad(shipment_id).then((value) => {
            resolve(value);
          });
        });
      }
    });
  }

  doLoad(id) {
    if (this.data.data) {
      return Promise.resolve(this.data);
    }
    
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let options = new RequestOptions({headers: headers});
      
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append("token", this.token);
      urlSearchParams.append("device_id", this.device_id + "");
      let body = urlSearchParams.toString();
      this.http.post('https://dantekitchen17.000webhostapp.com/api/device/shipment/' + id, body, options)
        .timeout(10000)
        .subscribe(data => {
          if (data.status == 200) {
            var result = JSON.parse(data.text());
            this.data.status = "success";
            if (result.length > 0) {
              this.data.status = result[0].result;
            }
            this.data.data = result;
            resolve(this.data);
          } else {
            this.data = {
              status: "error_connection",
              errorName: "Error",
              errorMessage: "Tidak bisa terkoneksi ke server"
            };
            resolve(this.data);
          }
          
        });
    });
  }

  updateShipmentStatus(url, shipment_id):any {
    return new Promise((resolve, reject) => {
      if (this.token != null) {
        this.doUpdateShipmentStatus(url, shipment_id).then((value) => {
          resolve(value);
        });
      } else {
        Promise.all([
          this.storage.get("device_id"),
          this.storage.get("token")
        ]).then((value) => {
          this.device_id = value[0];
          this.token = value[1];
          this.doUpdateShipmentStatus(url, shipment_id).then((value) => {
            resolve(value);
          });
        });
      }
    });
  }

  doUpdateShipmentStatus(url, shipment_id) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let options = new RequestOptions({headers: headers});
      
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append("token", this.token);
      urlSearchParams.append("device_id", this.device_id + "");
      urlSearchParams.append("shipment_id", shipment_id + "");
      let body = urlSearchParams.toString();

      this.http.post(url, body, options)
      .timeout(10000)
      .subscribe(data => {
        if (data.status == 200) {
          var result = JSON.parse(data.text());
          var hasil = {
            status: "",
            data: {},
            errorName: "",
            errorMessage: ""
          };
          hasil.status = "success";
          
          if (result.length > 0) {
            hasil.status = result[0].result;
          }
          hasil.data = result;
          
          resolve(hasil);
        } else {
          hasil.status = "error_connection";
          hasil.errorName = "Error";
          hasil.errorMessage = "Tidak bisa terkoneksi ke server";
          resolve(hasil);
        }
      });
    });
  }
}
