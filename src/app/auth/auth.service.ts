import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = "";
  loading = false;
  constructor(public afAuth: AngularFireAuth, public router: Router, private firebase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(async(user) => {
      if (user) {
        await this.firebase.database.ref('Employee').orderByChild('Email').equalTo(user.email).limitToFirst(1).once("value", (value) => {
          if (value.exists()) {
            value.forEach((element) => {
              var user_info=element.toJSON();
              user_info["Id"]=element.key;
              localStorage.setItem('currentUser', JSON.stringify(user_info));
              if (element.toJSON()["Status"] == 0) {
                this.router.navigate(['/login']);
              }});
          }
          else {
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    })

  }
  async login(email: string, password: string) {
    this.loading = true;
    this.errorMessage="";
    var user=null;
    await this.firebase.database.ref('Employee').orderByChild('Email').equalTo(email).limitToFirst(1).once("value", (value) => {
      if (value.exists()) {
        value.forEach((element) => {
          user=element.toJSON();
          user["Id"]=element.key;
          if (user["Status"] == 0) {
            this.loading = false;
            this.errorMessage = "Tài Khoản Đã Bị Khóa";
          }
          else
          {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then
            (() => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['']);
              this.loading = false;
            }
            ).catch((error) => {
              if (error.code=="auth/user-not-found")
              {
                this.errorMessage = "Tài khoản không tồn tại hoặc đã bị xóa";
              }
              else
              if (error.code=="auth/wrong-password")
              {
                this.errorMessage = "Mật khẩu không đúng";
              }
              else
              if (error.code=="auth/invalid-password")
              {
                this.errorMessage = "Mật khẩu không hợp lệ";
              }
              else
              if (error.code=="auth/id-token-expired")
              {
                this.errorMessage = "Token không hợp lệ";
              }
              else
              {
                this.errorMessage = "Không thể đăng nhập";
              }
              this.loading = false;
            }
            );
          }
        }
          );
      }
      else {
        this.loading = false;
        this.errorMessage = "Tài Khoản Không Tồn Tại";
      }
    });
  }
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {  
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(()=>
    {
      this.errorMessage="";
    }).catch(()=>
    {
      this.errorMessage="Email Không Tồn Tại Hoặc Lỗi Server";
    });
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  async getToken() {
    return await this.afAuth.auth.currentUser.getIdToken();
  }
}
