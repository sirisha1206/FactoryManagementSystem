import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-references',
  templateUrl: 'references.html',
})
export class ReferencesPage {
  docs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.docs = JSON.parse(this.navParams.get('docs'));
    console.log('ionViewDidLoad ReferencesPage');
  }

}
