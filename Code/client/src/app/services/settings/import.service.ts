import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createImport(importdata) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('import/create');
    return this.http.post(url, importdata, { headers: headers });
  }

  getImportHistory() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('import/importHistory');
    return this.http.get(url, { headers: headers });
  }
}
