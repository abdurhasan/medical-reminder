
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BASE_URL } from '../global';
import { AlertController } from 'ionic-angular';
import * as isEmpty from 'is-empty';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { App } from 'ionic-angular';



@Injectable()
export class AppService {
    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
        private alertCtrl: AlertController,
        private app: App,
    ) { }


    async useGuard(currentPage: string): Promise<void> {
        const getUserData = await this.storage.get('userData')
        const getScheduleData = await this.storage.get('data')
        const canActive: boolean = !isEmpty(getUserData)

        switch (currentPage) {
            case 'LoginPage':
                if (canActive && !isEmpty(getScheduleData)) {
                    await this.app.getActiveNav().push(TabsPage);
                }
                else if (canActive) {
                    await this.app.getActiveNav().push('TimePickerPage');
                }
                break;
            default:
                if (!canActive) {
                    await this.app.getActiveNav().push(LoginPage);
                }
                break;
        }
    }

    async runRequest<T>(route: string, payload: any): Promise<T> {
        try {
            const url: string = BASE_URL + route;
            const token: string = await this.storage.get('token');
            const headers = new HttpHeaders({ timeout: '30000' })
                .set('Authorization', token)
                .append('Content-Type', 'application/json');

            const callApi: any = await this.httpClient.post(url, payload, { headers }).toPromise()
            return callApi

        } catch (err) {
            const errorMessage: string = (err.error && err.error.message) ? err.error.message : 'some error happens';
            throw errorMessage
        }

    }

    async errorAlert(message?: string, callBackFunction?: any) {
        const confirm = this.alertCtrl.create({
            title: 'Error',
            message: message ? message : 'terjadi error',
            cssClass: 'error_alert',
            buttons: [
                {
                    text: 'Close',
                    cssClass: 'cancel_button',
                    handler: () => {
                        if (callBackFunction && typeof (callBackFunction) === 'function') {
                            callBackFunction()
                        }

                    }
                }]
        });
        confirm.present();

    }

}