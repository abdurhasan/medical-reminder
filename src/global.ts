// export const BASE_URL: string = 'http://localhost:3000/'
export const BASE_URL: string = 'https://remindmerhay.herokuapp.com/'
import * as moment from 'moment';

export interface IResponse {
    success: boolean;
    data: any[];
    message: string
}


export interface IUserData {
    userName: string;
    fullName: string;
    address: string;
    phone: string;
    ktp: string;
    consultantPhone?: string;
}

export interface IScheduleData {
    past: ISchedule[],
    present: ISchedule[]
}

export interface ISchedule {
    id: number;
    date: string;
    isChecked: boolean;
}

export function generateByDays(startDay: Date = new Date(), endDay: number = 28): string[] {
    const startDate = moment(startDay);
    const endDate = moment(startDay).add(endDay, 'days');
    const listSchedule: string[] = [];

    while (endDate.diff(startDate, 'days') > 0) {
        listSchedule.push(startDate.format());
        startDate.add(1, 'days');
    }

    return listSchedule;
}

export enum EventEnums {
    LOGOUT = 'clear:all-notif',
    RUN_NOTIF = 'run:notif',
    STOP_RUN_TODAY = 'run:stop-today',
    FORCE_RUN_DAY = 'run:start-today'
}


export function LogInfo(text) {
    console.log(`%c ${text}`, 'color: green; font-weight: bold;');
}

export function LogError(text) {
    console.log(`%c ${text}`, 'color: red; font-weight: bold;');
}

export const TEN_SECOND_MS = 10000;
export const ONE_MINUTE_MS = 60 * 1000;
export const ONE_HOUR_MS = ONE_MINUTE_MS * 60;

export const ONE_DAY_MS = ONE_HOUR_MS * 24
