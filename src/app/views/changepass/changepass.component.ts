import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { error } from '@angular/compiler/src/util';
import { async } from 'q';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {
  oldpass: string='';
  newpass:  string= '';
  repass: string='';
  user : any;
  showpass=false;
  constructor(private afAuth: AngularFireAuth,private toastr: ToastrService,public router: Router) { }

  ngOnInit() {

  }
  Reset(form: NgForm)
  {
    this.oldpass="";
    this.newpass="";
    this.repass="";
    form.form.markAsPristine();
  }
  showpss()
  {
    this.showpass=true;
    var x = document.getElementById("oldpassword_chg");
    var y = document.getElementById("newpassword_chg");
    var z = document.getElementById("repassword_chg");
    x.setAttribute('type','text');
    y.setAttribute('type','text');
    z.setAttribute('type','text');
  }
  hidpss()
  {
    this.showpass=false;
    var x = document.getElementById("oldpassword_chg");
    var y = document.getElementById("newpassword_chg");
    var z = document.getElementById("repassword_chg");
    x.setAttribute('type','password');
    y.setAttribute('type','password');
    z.setAttribute('type','password');
  }
  updatepass()
  {
    var user=this.afAuth.auth.currentUser;
    const credential = auth.EmailAuthProvider.credential(
     user.email, 
      this.oldpass
  );
  user.reauthenticateAndRetrieveDataWithCredential(credential).then
  (()=>
        {
          user.updatePassword(this.newpass).then
          (async()=>
          {
            this.toastr.success( 'Thay Đỏi Mật Khẩu Thành Công','Thành Công!',{timeOut: 2000});
            this.router.navigate(['']);
          }).catch
          (()=>
          {
            this.toastr.error( 'Thay Đổi Mật Khẩu Thất Bại','Thất Bại!',{timeOut: 2000});
          });
        }
  ).catch(()=>
  {
      this.toastr.error( 'Mật Khẩu Cũ Không Đúng','Thất Bại!',{timeOut: 2000});
  });
  }
}
