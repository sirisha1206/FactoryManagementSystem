import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/common/auth.service';
import { ReferencesPage } from '../../pages/references/references';

/**
 * Generated class for the StepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
})
export class StepsPage {
  steps:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepsPage');
    this.steps = JSON.parse(this.navParams.get('steps'));
  }

  openReference(step){
    console.log(step);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('step/getById/');
    return this.http.get(url + step._id, { headers: headers }).subscribe(result => {
      console.log(result);
      this.navCtrl.push(ReferencesPage, {"docs":JSON.stringify(result["data"]["documents"])});
    });
  }
}
