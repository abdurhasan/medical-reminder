import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingComponentPage } from './loading-component';

@NgModule({
  declarations: [
    LoadingComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadingComponentPage),
  ],
})
export class LoadingComponentPageModule {}
