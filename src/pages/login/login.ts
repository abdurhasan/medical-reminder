import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppService } from '../../app/app.service';
import * as isEmpty from 'is-empty';
import { IResponse, EventEnums, LogError, ISchedule, IUserData, TEN_SECOND_MS, ONE_HOUR_MS } from '../../global';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';
// import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username: string = '';
  public loading: any;
  private userData: IUserData;
  private notifRunHour: number;
  private intervalAlert: any;
  private stillRunToday: boolean = true;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    public appService: AppService,
    private loadingCtrl: LoadingController,
    public localNotifications: LocalNotifications,
    public events: Events,
  ) {

    events.subscribe(EventEnums.LOGOUT, () => {
      clearInterval(this.intervalAlert)
    })

    events.subscribe(EventEnums.STOP_RUN_TODAY, () => {
      this.stillRunToday = false;
    })

    events.subscribe(EventEnums.FORCE_RUN_DAY, () => {
      this.stillRunToday = true;
    })




  }

  ionViewDidLoad() {
    this.appService.useGuard('LoginPage')
  }

  presentLoad() {
    this.loading = this.loadingCtrl.create()
    this.loading.present()
  }



  initiateNotif() {
    const self = this;
    const notifMassage: string = !isEmpty(self.userData) ?
      `Hallo  ${self.userData.fullName}, jadwalnya pil KB ya! :`
      :
      'Haii , sudah waktunya minum pil KB nih , nanti bunting lg loh : ';

    // let lastRun = 0 // Flag untuk next running = moment + 24 jam

    this.intervalAlert = setInterval(() => {
      if (self.stillRunToday) {

        // const activeNotif: boolean = !isEmpty(self.notifRunHour)      

        self.localNotifications.schedule({
          text: notifMassage,
          sound: 'file://assets/sounds/alarm.mp3',
        });

      }
    }, TEN_SECOND_MS)

  }

  async nextPage() {
    this.presentLoad()
    try {
      await this.storage.set('token', this.username);
      const dataUser = await this.appService.runRequest<IUserData>('login', { username: this.username })
      const userData = dataUser['data'];
      this.userData = userData;
      // console.log('DORR   ',this.userData)

      await this.storage.set('userData', userData);

      const { data } = await this.appService.runRequest<IResponse>('getSchedule', {})

      if (isEmpty(data['past']) && isEmpty(data['present'])) {
        await this.navCtrl.push('DatePickerPage');
      }
      else {
        await this.storage.set('data', data)
        await this.navCtrl.push(TabsPage);
        this.notifRunHour = new Date(data['present'][0].date).getHours();
        // alert('NEXT PAGE ' + this.notifRunHour)
        this.initiateNotif();
      }


      this.loading.dismiss()
    } catch (error) {
      console.log('error login.nextPage', error)
      this.appService.errorAlert(error)
      this.loading.dismiss()
    }
  }

}

// const tm = payload[0].date

    // const now = moment()

    // const future = moment(tm).format("DD MMMM YYYY - HH:mm:ss")        
    // const bedaMs = moment(tm).diff(now, 'ms')
    // const bedaSecond = moment(tm).diff(now, 'second')
    // const sekarang = now.format("DD MMMM YYYY - HH:mm:ss")        

    // console.log({sekarang , bedaMs , bedaSecond, future})
