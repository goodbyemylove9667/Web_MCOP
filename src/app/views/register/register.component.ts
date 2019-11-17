import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['../../../assets/styles/login.css']
})
export class RegisterComponent {
  email="";
  password="";
  message="";
  showpass=false;
  constructor(private  service:  AuthService, public router: Router) { }
  ngOnInit() {
  }
  forgot()
  {
      this.service.sendPasswordResetEmail(this.email).then
      (()=>
      {
      this.message=this.service.errorMessage;
      if (this.message="")
      {
   
      }});
  }
 
}
