import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login'
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { PopoverPage } from '../pages/popover/popover';
import { DriverServiceProvider } from '../providers/driver-service/driver-service';
import { ShipmentServiceProvider } from '../providers/shipment-service/shipment-service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';

//import { GoogleMaps } from '@ionic-native/google-maps';
import { Device } from '@ionic-native/device';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { Toast } from '@ionic-native/toast';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Dialogs } from '@ionic-native/dialogs';
import { CommonServiceProvider } from '../providers/common-service/common-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    DetailPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    DetailPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DriverServiceProvider,
    ShipmentServiceProvider,
    //GoogleMaps,
    Device,
    BackgroundGeolocation,
    Geolocation,
    LocationTrackerProvider,
    Toast,
    BackgroundMode,
    AppMinimize,
    Dialogs,
    CommonServiceProvider
  ]
})
export class AppModule {}
