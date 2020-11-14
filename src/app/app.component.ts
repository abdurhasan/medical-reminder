import { Component } from '@angular/core';
import { Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { EventEnums, ONE_DAY_MS } from '../global';
// import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  notifIds: number[];


  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public events: Events,

  ) {
    this.notifIds = [];
    platform.ready().then(() => {
      statusBar.styleDefault();
    });

    // this.menuController.enable(true)

    setInterval(() => {
      this.events.publish(EventEnums.FORCE_RUN_DAY, null)
    }, ONE_DAY_MS)


  }

}

