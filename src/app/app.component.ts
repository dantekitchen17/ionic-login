import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  pages: Array<{title: string, data: string, component: any}>;

  constructor(platform: Platform, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: "Home", data: "home", component: HomePage },
      { title: "Logout", data: "logout", component: null }
    ];
  }

  sideMenuClick(item) {
    if (item.data == "logout") {
      this.logout();
    }
  }

  logout() {
    //this.menu.close();
    this.menu.enable(false);
    this.storage.remove("isLoggedIn");
    this.storage.remove("driver_id");
    this.nav.setRoot(this.rootPage, {}, {animate: true, direction: 'forward'});
  }
}

