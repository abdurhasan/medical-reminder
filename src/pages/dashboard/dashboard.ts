import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { EventEnums, IUserData, LogInfo } from '../../global';
import { AppService } from '../../app/app.service';
import { InAppBrowser } from '@ionic-native/in-app-browser'

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  presentData: string[];
  pastData: string[];
  moment: Function;
  userData: IUserData;
  clock: number;
  greetingMessage: string;
  consultantWhatsapp: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage,
    public appService: AppService,
    private events: Events,
    public inAppBrowser: InAppBrowser,
    public menuController: MenuController
  ) {
    this.moment = moment;
    setInterval(() => this.clock = Date.now(), 1000)
  }


  sameDay(deday: string): boolean {
    const result = moment(deday).diff(moment(), 'days') === 0 && moment(deday).format('D') !== moment().format('D');
    return result;
  }

  OpenUrl() {
    const browser = this.inAppBrowser.create(this.consultantWhatsapp)
    browser.show()
  }


  async ionViewDidLoad() {
    await this.appService.useGuard('DashboardPage')
    const getUserData = await this.storage.get('userData')
    const getScheduleData = await this.storage.get('data')

    // LogInfo(getScheduleData,getUserData)
    if (getUserData && getScheduleData) {
      this.presentData = getScheduleData['present'] ? getScheduleData['present'] : []
      this.pastData = getScheduleData['past'] ? getScheduleData['past'] : []
      this.userData = getUserData;
      this.consultantWhatsapp = 'https://api.whatsapp.com/send?phone=' + getUserData.consultantphone;

    }
  }

  logoutConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Logout Confirmation',
      message: 'Are you sure want to logout from you account reminder?',
      cssClass: 'logout_alert',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

            LogInfo('Cancel');
          },
          cssClass: 'cancel_button'
        },
        {
          text: 'Yes, Logout',
          handler: async () => {
            LogInfo('Yes, Logout');
            this.menuController.enable(false)
            this.events.publish(EventEnums.LOGOUT, null)
            await this.storage.clear()
            await this.navCtrl.setRoot(LoginPage);
          },
          cssClass: 'yes_button'
        }
      ]
    });
    confirm.present();

  }


  async updatePresentData(index: number) {
    this.events.publish(EventEnums.STOP_RUN_TODAY, null)

    const getScheduleData = await this.storage.get('data')
    getScheduleData['present'] = this.presentData
    this.storage.set('data', getScheduleData);
  }

}
