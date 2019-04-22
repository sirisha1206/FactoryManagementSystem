import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addPart(part) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('part/create');
    return this.http.post(url, part, { headers: headers });
  }

  updatePart(part) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('part/update/');
    url = url + `${part._id}`;
    return this.http.put(url, part, { headers: headers });
  }

  deletePart(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('part/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getParts() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('part/all/');
    return this.http.get(url, { headers: headers });
  }

  getPartName(searchTerm){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('part/get/');
    return this.http.get(url+searchTerm, { headers: headers });
  }
}
