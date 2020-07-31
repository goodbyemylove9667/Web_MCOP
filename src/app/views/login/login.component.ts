import { Component,OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/styles/login.css'],
})
export  class  LoginComponent  implements  OnInit {
  @ViewChild('form', { static: false }) private form: NgForm;
  email="";
  password="";
  type=1;
  showpass=false;
  FB: any;
  constructor(private  service:  AuthService) { }
  ngOnInit() {
  }
  login()
  {
      this.service.login(this.email,this.password);
  }
  change()
  { 
    this.password="";
    this.service.errorMessage="";
    this.form.form.markAsPristine();
    if(this.type==1) this.type=2
    else this.type=1;
  }
  forgot()
  {
    this.service.loading=true;
      this.service.sendPasswordResetEmail(this.email).then
      (()=>
      {
        this.type=1;
      this.service.loading=false;
    }).catch
    (()=>
    {
      this.type=1;
       this.service.loading=false;
    }
    );
    }

  showpss()
  {
    this.showpass=true;
    var x = document.getElementById("password");
    x.setAttribute('type','text');
  }
  hidpss()
  {
    this.showpass=false;
    var x = document.getElementById("password");
    x.setAttribute('type','password');
  }
 }
