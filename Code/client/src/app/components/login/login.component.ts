import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../../services/common/auth.service';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String="";
  password: String="";
  modalRef: BsModalRef;
  fusername: String="";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  onLoginSubmit() {
    if (this.username !== "" && this.password !== "") {
      const user = {
        username: this.username,
        password: this.password
      }

      this.authService.authenticateUser(user).subscribe(data => {
        console.log(data);
        if (data["success"]) {
          this.authService.storeUserData(data["token"], data["user"], data["privillages"]);
          console.log("Logged In");
          this.router.navigate(['home']);
        } else {
          var toast: Toast = {
            type: 'error',
            title: 'Error',
            body: 'Invalid Username/Password.',
            showCloseButton: true
          };
          this.toasterService.pop(toast);
          console.log("Login falied.");
          this.router.navigate(['/']);
        }
      });
    }
    else{
      var toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Please fill the all the details.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    }
  }

  sendMail(){
    this.authService.forgotPassword(this.fusername).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'An email has been sent. please check your email for temporary password.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.modalRef.hide();
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}
