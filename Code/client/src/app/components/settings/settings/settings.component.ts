import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../services/settings/setting.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  categoryList:any;
  category:string="";
  settingData:string="";
  settingValue:string="";
  constructor(
    private settingService:SettingService,
    private toasterService: ToasterService
  ) {
    this.settingService.getSettings().subscribe(data=>{
      this.categoryList = data;
    });
   }

  ngOnInit() {
  }

  settingchange(event) {
    console.log(event.target.value);
    this.settingData = this.categoryList.filter(el => {
      return el._id === event.target.value;
    })[0];
    this.settingValue = this.settingData["value"];
  }

  save(){
    this.settingData["value"] = this.settingValue;
    this.settingService.updateSetting(this.settingData).subscribe(data=>{
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Setting updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    });
  }
  cancel(){
   
  }
}
