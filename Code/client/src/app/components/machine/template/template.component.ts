import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ReasonService } from '../../../services/machine/reason.service';
import { TemplateService } from '../../../services/machine/template.service';
import { StepgroupService } from '../../../services/machine/stepgroup.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  template = {
    "name": "",
    "description": "",
    "reason": "",
    "machine": "",
    "stepgroups":[]
  };
  documents: any;
  isList: boolean = true;
  isNew: boolean = true;
  equipentList: any;
  reasonList: any;
  templates:any;

  /*Auto complete variables start */
  search: string;
  searchResults: any;
  showResults: boolean;
  /*Auto complete variables end */

  constructor(
    private machineService: MachineService,
    private reasonService: ReasonService,
    private templateService:TemplateService,
    private stepgroupService:StepgroupService,
    private toasterService: ToasterService
  ) {
    this.machineService.getMachines().subscribe(data => {
      this.equipentList = data;
    });
    this.reasonService.getAllReasons().subscribe(data => {
      this.reasonList = data;
    });
    this.getTemplates();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.template = {
      "name": "",
      "description": "",
      "reason": "",
      "machine": "",
      "stepgroups":[]
    };
  }
  back() {
    this.isList = true;
  }
  populate(template) {
    this.isList = false;
    this.isNew = false;
    this.template = template;
  }

  getTemplates() {
    this.templateService.getAllTemplates().subscribe(data => {
      this.templates = data;
    });
  }

  save() {
    if (this.template.name !== "" && this.template.description !== "") {
      this.templateService.addTemplate(this.template).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Template saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getTemplates();
      });
    }else{
      var toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Please fill the all the details.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    }
  }
  delete() {
    this.templateService.deleteTemplate(this.template["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Template deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getTemplates();
    });
  }
  update() {
    this.templateService.updateTemplate(this.template).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Template updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getTemplates();
    });
  }
  cancel() {
    this.isList = true;
  }

   /*Auto complete methods start */
   onSearchChange(value) {
    if (value.length > 2) {
      this.stepgroupService.getStepGroupName(value).subscribe(data => {
        this.showResults = true;
        this.searchResults = data;
        console.log(data);
      });
    }
  }

  selectedItem(item) {
    this.search = item.name;
    this.showResults = false;
  }

  addStepGrpToTemplate(searchTerm) {
    let stepgroup = this.searchResults.filter(function (el) {
      return el.name === searchTerm;
    })[0];
    this.search = "";
    this.template.stepgroups.push(stepgroup);
  }
  deleteStepGrp(stepgroup) {
    this.template.stepgroups = this.template.stepgroups.filter(function (el) {
      return el._id !== stepgroup._id;
    });
  }
  /*Auto complete methods end */
}
