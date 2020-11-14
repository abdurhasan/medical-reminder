import { Component } from '@angular/core';
import { App, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventEnums, LogInfo } from '../../global';
import { AppService } from '../../app/app.service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    // public events: Events,
    private app: App,
  ) {
    


    this.news = [
      {
        "img": "https://media.suara.com/pictures/480x260/2017/02/13/17239-ilustrasi-pasangan-konflik-berdebat-bertengkar.jpg",
        "title": "Hasrat Seks Wanita Turun, Apakah Pasangan Perlu Curiga?",
        "date": "Senin, 19 Oktober 2020 | 12:50 WIB",
        "link": "https://amp.suara.com/health/2020/10/19/125000/hasrat-seks-wanita-turun-apakah-pasangan-perlu-curiga"
      },
      {
        "img": "https://media.suara.com/pictures/480x260/2017/08/20/21779-minum-pil-kb.jpg",
        "title": "DKT Indonesia Rilis Pil KB Baru yang Mampu Jaga Keseimbangan Hormon Wanita",
        "date": "Kamis, 24 September 2020 | 17:29 WIB",
        "link": "https://amp.suara.com/health/2020/09/24/172932/dkt-indonesia-rilis-pil-kb-baru-yang-mampu-jaga-keseimbangan-hormon-wanita"
      },
      {
        "img": "https://media.suara.com/pictures/653x366/2014/11/23/o_197do30pu1uhj1lb4l41obm1f68a.jpg",
        "title": "Bisa Picu Kehamilan, Jangan Minum Antibiotik dan Pil KB Bersamaan!",
        "date": "Rabu, 19 Agustus 2020 | 13:19 WIB",
        "link": "https://amp.suara.com/health/2020/08/19/131917/bisa-picu-kehamilan-jangan-minum-antibiotik-dan-pil-kb-bersamaan"
      },
      {
        "img": "https://media.suara.com/pictures/480x260/2020/04/28/71316-ilustrasi-pasien-covid-19.jpg",
        "title": "Waduh, Penggunaan Pil KB Bisa Meningkatkan Risiko Kematian Covid-19",
        "date": "Selasa, 04 Agustus 2020 | 10:07 WIB",
        "link": "https://amp.suara.com/health/2020/08/04/100704/waduh-penggunaan-pil-kb-bisa-meningkatkan-risiko-kematian-covid-19"
      },
      {
        "img": "https://media.suara.com/pictures/653x366/2019/03/26/58551-pil-kb.jpg",
        "title": "Begini Alasan Banyak Perempuan Alami Perubahan Mood saat Konsumsi Pil KB",
        "date": "Rabu, 29 Juli 2020 | 13:53 WIB",
        "link": "https://amp.suara.com/health/2020/07/29/135358/begini-alasan-banyak-perempuan-alami-perubahan-mood-saat-konsumsi-pil-kb"
      },
      {
        "img": "https://media.suara.com/pictures/480x260/2017/08/20/21779-minum-pil-kb.jpg",
        "title": "Peneliti Ungkap Ukuran Dasar Otak Lebih Kecil pada Wanita yang Minum Pil KB",
        "date": "Selasa, 07 Januari 2020 | 19:00 WIB",
        "link": "https://amp.suara.com/health/2020/01/07/190000/peneliti-ungkap-ukuran-dasar-otak-lebih-kecil-pada-wanita-yang-minum-pil-kb"
      },
      {
        "img": "https://media.suara.com/pictures/480x260/2016/07/27/o_1aok7s4d71hja1fr8vc9tmr1aq2a.jpg",
        "title": "Peneliti Kembangkan Pil KB yang Bisa Dikonsumsi Sebulan Sekali",
        "date": "Kamis, 02 Januari 2020 | 15:55 WIB",
        "link": "https://amp.suara.com/health/2020/01/02/155538/peneliti-kembangkan-pil-kb-yang-bisa-dikonsumsi-sebulan-sekali"
      },
      {
        "img": "https://media.suara.com/pictures/480x260/2014/11/23/o_197do30pu1uhj1lb4l41obm1f68a.jpg",
        "title": "Pil KB Tingkatkan Risiko Kanker Payudara dan Kanker Serviks? Ini Faktanya!",
        "date": "Jum'at, 24 Mei 2019 | 16:50 WIB",
        "link": "https://amp.suara.com/health/2019/05/24/165000/pil-kb-tingkatkan-risiko-kanker-payudara-dan-kanker-serviks-ini-faktanya"
      },
      {
        "img": "https://media.suara.com/pictures/480x260/2014/08/05/shutterstock_1741973901.jpg",
        "title": "Konsumsi Pil KB Tunda Kehamilan Juga Bisa Cegah Anemia",
        "date": "Selasa, 26 Maret 2019 | 15:30 WIB",
        "link": "https://amp.suara.com/health/2019/03/26/153000/konsumsi-pil-kb-tunda-kehamilan-juga-bisa-cegah-anemia"
      }
    ]
  }

  ionViewDidLoad() {
    LogInfo('ionViewDidLoad NewsPage');
  }

}
