import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  constructor(public http: Http) {
    console.log('Hello ShipmentServiceProvider Provider');
  }

  load(id: number) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    
    return new Promise(resolve => {
      this.http.get('https://dantekitchen17.000webhostapp.com/api/device/shipment/' + id)
        .timeout(1000)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, (err) => {
          alert(err);
          console.log(err);
        });
    });
  }
}
