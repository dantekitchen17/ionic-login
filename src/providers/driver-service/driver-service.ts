import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';

/*
  Generated class for the DriverServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DriverServiceProvider {
  id: number;
  result: any;

  constructor(public http: Http, public storage: Storage) {
    this.result = {};
    storage.get("device_id").then((value) => {
      this.id = value;
    });
  }

  load(reload = false) {
    if (!reload) {
      if (this.result.data) {
        return Promise.resolve(this.result);
      }
    }

    return new Promise(resolve => {
      this.http.get('https://dantekitchen17.000webhostapp.com/api/device/' + this.id)
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
