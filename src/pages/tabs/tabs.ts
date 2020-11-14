import { Component } from '@angular/core';
import { App, Events, IonicPage } from 'ionic-angular';
import { EventEnums } from '../../global';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = "DashboardPage";
  tab2 = "NewsPage";

  constructor(public events: Events, private app: App,) {

    events.subscribe(EventEnums.LOGOUT, () => {
      
      this.app.getActiveNav().push(LoginPage);
    })

  }

  ionViewDidLoad() {
    // this.tab1;
    // this.tab2;
    // console.log('ionViewDidLoad TabsPage');
  }

}
