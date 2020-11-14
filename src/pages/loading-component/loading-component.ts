import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { Storage } from '@ionic/storage';
import * as isEmpty from 'is-empty';
import { IResponse } from '../../global';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-loading-component',
  templateUrl: 'loading-component.html',
})
export class LoadingComponentPage {
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    public appService: AppService,
    private storage: Storage,
  ) {
    this.appService.useGuard('LoadingComponentPage')
    const scheduleDate: string = this.navParams.data.hasOwnProperty('scheduleDate') ? this.navParams.data.scheduleDate : null;
    if (isEmpty(scheduleDate)) {
      this.navCtrl.push('DatePickerPage');
    }

    this.setSchedule(scheduleDate)

  }

  async setSchedule(scheduleDate: string) {

    try {
      const postSchedule: IResponse = await this.appService.runRequest<IResponse>('setSchedule', { scheduleDate })
      if (postSchedule.success) {
        await this.storage.set('data', postSchedule.data)
        await this.navCtrl.push(TabsPage)
        // this.events.publish(EventEnums.USER_GET_SCHEDULE, postSchedule.data['present']);

      } else {
        throw postSchedule.message;
      }



    } catch (error) {
      console.log('error LoadingComponentPage.setSchedule', error)
      await this.appService.errorAlert(error, this.navCtrl.push('DatePickerPage'))

    }

  }



}
