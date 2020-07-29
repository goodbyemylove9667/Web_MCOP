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
    var status =1;
    this.errorMessage="";
    var user=null;
    await this.firebase.database.ref('Employee').orderByChild('Email').equalTo(email).limitToFirst(1).once("value", (value) => {
      if (value.exists()) {
        value.forEach((element) => {
          user=element;
          user["Id"]=element.key;
          if (element.toJSON()["Status"] == 0) {
            status=0;
            this.loading = false;
            this.errorMessage = "Tài Khoản Đã Bị Khóa";
          }})
      }
      else {
        status=0;
        this.loading = false;
        this.errorMessage = "Tài Khoản Không Tồn Tại";
      }
    });
    if (status==1)
    {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then
    (() => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['']);
      this.loading = false;
    }
    ).catch((error) => {
      this.loading = false;
      if (error.toString().includes("The email address is already in use by another account."))
        this.errorMessage = "Địa chỉ email đã được sử dụng bởi tài khoản khác."
      else
        if (error.toString().includes("The custom token format is incorrect. Please check the documentation."))
          this.errorMessage = "Định dạng mã thông báo tùy chỉnh không chính xác. Vui lòng kiểm tra tài liệu."
        else
          if (error.toString().includes("The custom token corresponds to a different audience."))
            this.errorMessage = "Mã thông báo tùy chỉnh tương ứng với một đối tượng khác."
          else
            if (error.toString().includes("The supplied auth credential is malformed or has expired."))
              this.errorMessage = "Thông tin xác thực được cung cấp không đúng định dạng hoặc đã hết hạn."
            else
              if (error.toString().includes("The email address is badly formatted."))
                this.errorMessage = "Địa chỉ email được định dạng sai."
              else
                if (error.toString().includes("The password is invalid or the user does not have a password."))
                  this.errorMessage = "Mật khẩu không hợp lệ."
                else
                  if (error.toString().includes("The supplied credentials do not correspond to the previously signed in user."))
                    this.errorMessage = "Thông tin đăng nhập được cung cấp không tương ứng với người dùng đã đăng nhập trước đó."
                  else
                    if (error.toString().includes("This operation is sensitive and requires recent authentication. Log in again before retrying this request."))
                      this.errorMessage = "Thao tác này rất nhạy cảm và yêu cầu xác thực gần đây. Đăng nhập lại trước khi thử lại yêu cầu này."
                    else
                      if (error.toString().includes("An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."))
                        this.errorMessage = "Một tài khoản đã tồn tại với cùng một địa chỉ email nhưng thông tin đăng nhập khác nhau. Đăng nhập bằng nhà cung cấp được liên kết với địa chỉ email này."
                      else
                        if (error.toString().includes("This credential is already associated with a different user account."))
                          this.errorMessage = "Thông tin đăng nhập này đã được liên kết với một tài khoản người dùng khác."
                        else
                          if (error.toString().includes("The user account has been disabled by an administrator."))
                            this.errorMessage = "Tài khoản người dùng đã bị vô hiệu hóa bởi quản trị viên."
                          else
                            if (error.toString().includes("The user's credential is no longer valid. The user must sign in again."))
                              this.errorMessage = "Thông tin đăng nhập của người dùng không còn hợp lệ. Người dùng phải đăng nhập lại."
                            else
                              if (error.toString().includes("There is no user record corresponding to this identifier. The user may have been deleted."))
                                this.errorMessage = "Tài khoản người dùng không chính xác hoặc có thể đã bị xóa."
                              else
                                if (error.toString().includes("The user's credential is no longer valid. The user must sign in again."))
                                  this.errorMessage = "Thông tin đăng nhập của người dùng không còn hợp lệ. Người dùng phải đăng nhập lại."
                                else
                                  if (error.toString().includes("This operation is not allowed. You must enable this service in the console."))
                                    this.errorMessage = "Thao tác này không được phép. Bạn phải kích hoạt dịch vụ này trong bảng điều khiển."
                                  else
                                    if (error.toString().includes("There is no user record corresponding to this identifier"))
                                      this.errorMessage = "Tài khoản không tồn tại hoặc đã xóa."
                                    else
                                      this.errorMessage = "Không Thể Đăng Nhập";
    }
    );
  }


  }
  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }
  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['admin/verify-email']);
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
