import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as XLSX from 'xlsx';
import { ImportService } from '../../../services/settings/import.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild('txtFile')
  myInputVariable: ElementRef;
  moduleList = [
    {
      "value": "machine",
      "key": "Machine"
    }
  ];
  module: string = "";
  sample = {
    "moduleName": "",
    "url": ""
  };
  modules: any = [
    {
      name: "machine",
      data: {
        "moduleName": "Machine",
        "url": "https://fms-2018.herokuapp.com/import/download"
      }
    }
  ];
  importHistory:any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  data: any = [];

  constructor(
   private importService: ImportService,
   private toasterService: ToasterService
  ) {
    this.importService.getImportHistory().subscribe(data=>{
      console.log(data);
      this.importHistory = data;
    });
   }

  ngOnInit() {
  }

  modulechange(event) {
    console.log(event.target.value);
    var m = this.modules.filter(el => {
      return el.name === event.target.value;
    });
    this.sample.moduleName = m[0].data.moduleName;
    this.sample.url = m[0].data.url;
  }


  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      for (let i = 0; i < wb.SheetNames.length; i++) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data = XLSX.utils.sheet_to_json(ws);
      }
      this.data.forEach(element => {
        element.dateOfInstall = this.convertExcelDate(element.dateOfInstall);
      });
      console.log(this.data);
      var importdata = {
        "moduleName":"machine",
        "data":this.data
      }
      this.importService.createImport(importdata).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Machine imported successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.myInputVariable.nativeElement.value = "";
        this.importService.getImportHistory().subscribe(data=>{
          console.log(data);
          this.importHistory = data;
        });
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  convertExcelDate(excelDate) {
    var date=new Date((excelDate - (25567 + 2))*86400*1000);
    return date.getMonth()+"/"+ date.getDate()+"/"+date.getFullYear();
  }
}
