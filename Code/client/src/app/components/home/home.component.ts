import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/common/auth.service';
import { Router } from '@angular/router';
import { MachineService } from '../../services/machine/machine.service';
import { MaintenanceService } from '../../services/home/maintenance.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  machines: any;
  rMaintenance = {
    _id: "0",
    machineName: "",
    machineId:"",
    schedule: ""
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private machineService: MachineService,
    private maintenanceService: MaintenanceService,
    private toasterService: ToasterService
  ) {
    var menu = this.authService.getSideMenuPage("home");
    this.router.navigate([menu.name]);
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }

  ngOnInit() {

  }

  update() {
    this.rMaintenance.machineName = this.machines.filter(el => {
      return el._id === this.rMaintenance.machineId;
    })[0].name;
    this.maintenanceService.updateMaintenance(this.rMaintenance).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Regular Maintenance updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    });
  }

  machineNameChange(event) {
    
    console.log(event.target.value);
    this.maintenanceService.getRMaintenanceByMachineId(event.target.value).subscribe(data => {
      console.log(data);
      if (data["length"] > 0) {
        this.rMaintenance._id = data[0]._id;
        this.rMaintenance.schedule = data[0].schedule;
      }else{
        this.rMaintenance._id = "0";
        this.rMaintenance.schedule = "";
      }
    });
  }
}
