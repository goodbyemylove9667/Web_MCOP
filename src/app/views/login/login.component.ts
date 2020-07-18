import { Component,OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/styles/login.css'],
})
export  class  LoginComponent  implements  OnInit {
  email="";
  password="";
  message="";
  type=1;
  showpass=false;
  FB: any;
  constructor(private  service:  AuthService) { }
  ngOnInit() {
  }
  login()
  {
      this.service.login(this.email,this.password);
      this.message=this.service.errorMessage;
  }
  change()
  { 
    if(this.type==1) this.type=2
    else this.type=1;
  }
  forgot()
  {
    this.service.loading=true;
      this.service.sendPasswordResetEmail(this.email).then
      (()=>
      {
      this.message=this.service.errorMessage;
        this.type=1;
      this.service.loading=false;
    }).catch
    (()=>
    {
      this.message=this.service.errorMessage;
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
