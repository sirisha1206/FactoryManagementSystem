import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';
import { PartService } from '../../../services/machine/part.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  part = {
    "name": "",
    "description": "",
    "isSerial":"",
    "availableQuantity":"",
    "qrCode":""
  };
  parts: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private partService: PartService,
    private toasterService: ToasterService
  ) { 
    this.getParts();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.part = {
      "name": "",
      "description": "",
      "isSerial":"",
      "availableQuantity":"",
      "qrCode":""
    };
  }
  back() {
    this.isList = true;
  }
  populate(part) {
    this.isList = false;
    this.isNew = false;
    this.part = part;
  }

  getParts() {
    this.partService.getParts().subscribe(data => {
      this.parts = data;
    });
  }

  save() {
    if (this.part.name !== "" && this.part.description !== "") {
      this.partService.addPart(this.part).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Part saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getParts();
      });
    } else {
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
    this.partService.deletePart(this.part["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Part deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getParts();
    });
  }
  update() {
    this.partService.updatePart(this.part).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Part updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getParts();
    });
  }
  cancel() {
    this.isList = true;
  }

  generateQR() {
    this.part.qrCode = "{ partName :" + this.part.name + "}";
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
