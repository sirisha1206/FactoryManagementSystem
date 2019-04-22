import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import { AuthService } from '../../../services/common/auth.service';
import { DocumentService } from '../../../services/machine/document.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  uploader: FileUploader;
  document = {
    "name": "",
    "description": "",
    "originalFileName": "",
    "uploadFileName": ""
  };
  files = [];
  isFileUploadDone: boolean = false;
  documents: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private toasterService: ToasterService
  ) {
    this.uploader = new FileUploader({ url: this.authService.prepEndpoint('document/upload') });
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.isFileUploadDone = true;
      let res = JSON.parse(response);
      this.files.push(res.originalname);
      this.document.uploadFileName = res.uploadName;
      this.document.originalFileName = res.originalname;
    }
    this.getDocuments();
  }

  ngOnInit() {
  }
  new() {
    this.isList = false;
    this.isNew = true;
    this.document = {
      "name": "",
      "description": "",
      "originalFileName": "",
      "uploadFileName": ""
    };
    this.files = [];
  }
  back() {
    this.isList = true;
  }
  populate(document) {
    this.isList = false;
    this.isNew = false;
    this.document = document;
    this.files = [];
    if (document.originalFileName !== "" && document.uploadFileName != "") {
      this.files.push(document.originalFileName);
    }
  }
  fileUpload() {
    this.uploader.queue.pop();
    this.isFileUploadDone = false;
  }
  deleteFile(file) {
    var index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
    this.document.originalFileName = "";
    this.document.uploadFileName = "";
  }

  getDocuments() {
    this.documentService.getDocuments().subscribe(data => {
      this.documents = data;
    });
  }

  save() {
    if (this.document.name !== "" && this.document.description !== "") {
      this.documentService.addDocument(this.document).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Document saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getDocuments();
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
    this.documentService.deleteDocument(this.document["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Document deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getDocuments();
    });
  }
  update() {
    this.documentService.updateDocument(this.document).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Document updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getDocuments();
    });
  }
  cancel() {
    this.isList = true;
  }
}
