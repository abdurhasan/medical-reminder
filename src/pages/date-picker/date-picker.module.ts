import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatePickerModule } from 'ionic-calendar-date-picker';
import { DatePickerPage } from './date-picker';

@NgModule({
  declarations: [
    DatePickerPage,
  ],
  imports: [
    IonicPageModule.forChild(DatePickerPage),
    DatePickerModule
  ],
})
export class DatePickerPageModule {}
