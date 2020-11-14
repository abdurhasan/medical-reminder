import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { IUserData , LogInfo} from '../../global';
import { Storage } from '@ionic/storage';
import { AppService } from '../../app/app.service';
import * as isEmpty from 'is-empty';

@IonicPage()
@Component({
  selector: 'page-date-picker',
  templateUrl: 'date-picker.html',
})
export class DatePickerPage implements OnInit {
  userData: IUserData;
  fromDate: Date;
  selectedDate: Date;
  generatedDates: Date[];

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    public appService: AppService,
  ) {
    this.fromDate = new Date();
    this.appService.useGuard('DatePickerPage')
  }

  ngOnInit() {
    this.storage.get('userData').then(valUser => this.userData = valUser)
  }

  ionViewDidLoad() {
    LogInfo('ionViewDidLoad DatePickerPage');
  }

  next() {
    if (isEmpty(this.selectedDate)) {
      this.appService.errorAlert('Anda belum mengisi tanggal minum')
    } else {
      this.navCtrl.push("TimePickerPage", { selectedDate: this.selectedDate })
    }

  }

  dateSelected(event) {
    this.selectedDate = event
  }

}
