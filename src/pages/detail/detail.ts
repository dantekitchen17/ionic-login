import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  id: number;
  detail: {
    nama: string,
    keterangan: string,
    pelanggan: string,
    tanggal_buat: string,
    perubahan_terakhir: string,
    berakhir: string,
    cara_pesan: string,
    lokasi_asal: string,
    lokasi_tujuan: string
  };
  nama: string;
  keterangan: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get("item").id;
    this.detail = {
      nama: "Furniture",
      keterangan: "ini adalah sembako yang akan dikirimkan ke beberapa tempat",
      pelanggan: "christian123",
      tanggal_buat: "2017-04-18 15:18:35",
      perubahan_terakhir: "2017-05-23 10:52:28",
      berakhir: "2017-06-08 07:27:27",
      cara_pesan: "Penawaran",
      lokasi_asal: "STTS, Baratajaya, Surabaya City, East Java, Indonesia",
      lokasi_tujuan: "Jl. Raya Lebani 100, Gresik"
    };
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
