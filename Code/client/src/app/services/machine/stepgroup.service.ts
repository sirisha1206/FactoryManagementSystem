import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StepgroupService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addStepgroup(stepgroup) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('stepgroup/create');
    return this.http.post(url, stepgroup, { headers: headers });
  }

  updateStepgroup(stepgroup) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('stepgroup/update/');
    url = url + `${stepgroup._id}`;
    return this.http.put(url, stepgroup, { headers: headers });
  }

  getStepGroupName(searchTerm){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('stepgroup/get/');
    return this.http.get(url+searchTerm, { headers: headers });
  }

  deleteStepgroup(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('stepgroup/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getAllStepgroups() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('stepgroup/all');
    return this.http.get(url, { headers: headers });
  }

  addStep(step) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('step/create');
    return this.http.post(url, step, { headers: headers });
  }

  updateStep(step) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('step/update/');
    url = url + `${step._id}`;
    return this.http.put(url, step, { headers: headers });
  }

  deleteStep(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('step/delete/');
    return this.http.delete(url + id, { headers: headers });
  }

  getAllSteps() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('step/all');
    return this.http.get(url, { headers: headers });
  }

  getStepById(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('step/getById/');
    return this.http.get(url + id, { headers: headers });
  }
}
