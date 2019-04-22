import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSettings() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('settings/all');
    return this.http.get(url, { headers: headers });
  }

  updateSetting(setting){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('settings/update/');
    url = url + `${setting._id}`;
    return this.http.put(url, setting, { headers: headers });
  }
}
