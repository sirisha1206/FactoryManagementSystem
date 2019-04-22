import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addTemplate(template) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('template/create');
    return this.http.post(url, template, { headers: headers });
  }

  updateTemplate(template) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('template/update/');
    url = url + `${template._id}`;
    return this.http.put(url, template, { headers: headers });
  }

  deleteTemplate(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('template/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getAllTemplates() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('template/all');
    return this.http.get(url, { headers: headers });
  }
}
