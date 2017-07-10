import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, public backgroundGeoLocation: BackgroundGeolocation, public geoLocation: Geolocation, private toast: Toast) {
    
  }

  startTracking() {
    let config = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true,
      startOnBoot: true,
      saveBatteryOnBackground: false,
      interval: 60000
    };

    this.backgroundGeoLocation.configure(config).subscribe((location) => {
      this.toast.show(location.latitude + ", " + location.longitude, "5000", "bottom");
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

    /*let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geoLocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      console.log(position);

      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });*/
  }

  stopTracking() {
    console.log('stop tracking');
    
    this.backgroundGeoLocation.finish();
    //this.watch.unsubscribe();
  }
}
