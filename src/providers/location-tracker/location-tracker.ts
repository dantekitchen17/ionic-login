import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {
  public id: number;
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, public http: Http, public backgroundGeoLocation: BackgroundGeolocation, public storage: Storage) {
    storage.get("device_id").then((value) => {
      this.id = value;
    });
  }

  startTracking() {
    let config = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false,
      startOnBoot: true,
      saveBatteryOnBackground: false,
      stopOnTerminate: false,
      notificationTitle: "Yukirim",
      notificationText: "is running in background",
      interval: 300000
    };

    this.backgroundGeoLocation.configure(config).subscribe((location) => {
      this.storage.set("location", {
        lat: location.latitude,
        lng: location.longitude,
        accuracy: location.accuracy
      });

      let headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let options = new RequestOptions({headers: headers});
      
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append("device_id", this.id + "");
      urlSearchParams.append("lat", location.latitude + "");
      urlSearchParams.append("lng", location.longitude + "");
      urlSearchParams.append("accuracy", location.accuracy + "");
      let body = urlSearchParams.toString();
      this.http.post("https://dantekitchen17.000webhostapp.com/api/post-coordinate", body, options)
        .subscribe(data => {
          
      });
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
    });

    this.backgroundGeoLocation.watchLocationMode().then((enabled) => {
      if (enabled) {
        this.backgroundGeoLocation.start();
      } else {

      }
    });

    this.backgroundGeoLocation.isLocationEnabled().then((enabled) => {
      if (enabled) {
        this.backgroundGeoLocation.start();
      } else {
        this.backgroundGeoLocation.showLocationSettings();
      }
    });
  }

  stopTracking() {
    console.log('stop tracking');
    
    this.backgroundGeoLocation.finish();
    this.backgroundGeoLocation.stop();
  }
}
