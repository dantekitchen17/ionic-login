import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DriverServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DriverServiceProvider {
  id: number;
  data: any;

  constructor(public http: Http, public storage: Storage) {
    this.data = null;
    storage.get("driver_id").then((value) => {
      this.id = value;
    });
  }

  load(reload = false) {
    if (!reload) {
      if (this.data) {
        return Promise.resolve(this.data);
      }
    }

    return new Promise(resolve => {
      this.http.get('https://dantekitchen17.000webhostapp.com/api/driver/' + this.id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, (err) => {
          alert(err);
        });
    });
  }
}
