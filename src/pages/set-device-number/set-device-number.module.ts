import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetDeviceNumberPage } from './set-device-number';

@NgModule({
  declarations: [
    SetDeviceNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(SetDeviceNumberPage),
  ],
  exports: [
    SetDeviceNumberPage
  ]
})
export class SetDeviceNumberPageModule {}
