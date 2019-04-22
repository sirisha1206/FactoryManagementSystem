import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/common/auth.service';
import { LoginPage } from '../login/login';
import { StepsPage } from '../steps/steps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket;
  tickets:any;
  constructor(public navCtrl: NavController, public authService:AuthService, private http: HttpClient) {
    this.getAllTickets().subscribe(data => {
      console.log(data);
      this.tickets = data;
    });
    this.socket = io.connect('https://fms-2018.herokuapp.com/');
  }

  ionViewDidLoad() {
    this.socket.on('newTicketCreated', () => {
      this.getAllTickets().subscribe(data => {
        console.log(data);
        this.tickets = data;
      });
     })
  }

  getAllTickets(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('maintenance/all/');
    return this.http.get(url, { headers: headers });
  }

  getTemplateData(tic)
  {
    console.log(tic);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('maintenance/maintenanceDetails');
    this.http.post(url, tic, { headers: headers }).subscribe(data => {
      console.log(data);
      this.navCtrl.push(StepsPage, {steps:JSON.stringify(data)});
    })
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

}
