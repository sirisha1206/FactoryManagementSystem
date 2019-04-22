import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  updateMaintenance(rMaintenance) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('maintenance/update/');
    url = url + `${rMaintenance._id}`;
    return this.http.put(url, rMaintenance, { headers: headers });
  }

  getRMaintenanceByMachineId(id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('maintenance/machine/');
    return this.http.get(url+id, { headers: headers });
  }
}
