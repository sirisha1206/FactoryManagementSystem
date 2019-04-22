import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {
  authToken: any;
  isDev: boolean;
  user: any;
  privillages: any;

  constructor(
    private http: HttpClient,
  ) {
    this.isDev = true;
  }

  authenticateUser(user) {
    console.log(JSON.stringify(user));
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.prepEndpoint('login/authenticate');
    return this.http.post(url, user, { headers: headers });
  }

  storeUserData(token, user, privillages) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', (typeof (user) === "string") ? user : JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.privillages = privillages;
  }


  getToken() {
    return localStorage.getItem('id_token');
  }



  prepEndpoint(ep) {
    if (!this.isDev) {
      return ep;
    } else {
      return 'https://fms-2018.herokuapp.com/' + ep;
    }
  }

}
