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
  result: any;

  constructor(public http: Http) {
    console.log('Hello ShipmentServiceProvider Provider');
    this.result = {};
  }

  load(id: number) {    
    if (this.result.data) {
      return Promise.resolve(this.result.data);
    }
    
    return new Promise(resolve => {
      this.http.get('https://dantekitchen17.000webhostapp.com/api/device/shipment/' + id)
        .timeout(10000)
        .map(res => res.json())
        .subscribe(data => {
          this.result.status = "success";
          this.result.data = data;
          resolve(this.result);
        }, (err) => {
          this.result.status = "error";
          this.result.errorName = err.name;
          this.result.errorMessage = err.message;
          resolve(this.result);
        });
    });
  }
}
