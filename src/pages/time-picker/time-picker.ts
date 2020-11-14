import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { IUserData } from '../../global';
import * as isEmpty from 'is-empty';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-time-picker',
  templateUrl: 'time-picker.html',
})
export class TimePickerPage {
  userData: IUserData;
  selectedDate: Date;
  selectedTime: string = '00:00';


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public appService: AppService,
  ) {
    const getSelectedDate: Date = this.navParams.data.hasOwnProperty('selectedDate') ? this.navParams.data.selectedDate : null;

    if (isEmpty(getSelectedDate)) {
      this.prev()
    }
    this.selectedDate = getSelectedDate;
    this.appService.useGuard('TimePickerPage')
  }

  prev() {
    this.navCtrl.push('DatePickerPage');
  }
  next() {
    const [hours, minutes] = this.selectedTime.split(':');
    const scheduleDate = moment(this.selectedDate).set({ hours: Number(hours), minutes: Number(minutes) }).toISOString()
    this.navCtrl.push('LoadingComponentPage', { scheduleDate });
  }

}
