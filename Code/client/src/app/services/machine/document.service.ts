import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addDocument(document) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('document/create');
    return this.http.post(url, document, { headers: headers });
  }

  updateDocument(document) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('document/update/');
    url = url + `${document._id}`;
    return this.http.put(url, document, { headers: headers });
  }

  deleteDocument(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('document/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getDocuments() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('document/all/');
    return this.http.get(url, { headers: headers });
  }

  getDocumentName(searchTerm){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('document/get/');
    return this.http.get(url+searchTerm, { headers: headers });
  }
}
