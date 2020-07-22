import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from  "@angular/fire/auth";
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';
import { reject } from 'q';
export interface Employee
{

    Id: string,
    Email: string,
    Password: string,
    Firstname : string,
    Lastname : string,
    Phone : string ,
    Address : string,
    Birthday : Date ,
    Image : string,
    Position : number ,
    Status : number 
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData : Employee;
  list : Employee[]
  data : Employee;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase : AngularFireDatabase,private af:AngularFireAuth,private api:ApiService) { }
 async resetForm(type) {
    if (type==1)
    {
    this.formData = {
      Id:'',
      Email: '',
      Password: 'abc123',
      Firstname : '',
      Lastname : '',
      Phone : '' ,
      Address : '',
      Birthday : new Date() ,
      Image: 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png',
      Position : 1 ,
      Status : 1
    };
  }
  else
  {
    this.formData=await JSON.parse(localStorage.getItem("employee_data"));
  }
  }
  getList() {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Employee').orderByChild("Date_Create").once("value",(value)=>
      resolve(value.toJSON()),(error)=>reject(error))
    });
  }

    getCkList()
    {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Employee').orderByChild("Status").equalTo(1).once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
  showModal(obj: Employee) {
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      localStorage.setItem("employee_data",JSON.stringify( this.formData));

    } else {
      this.resetForm(1);
    }
  }

 async insert(form :NgForm)
 {
  const  email  =  await JSON.parse(localStorage.getItem('email'));
  const  password  =  await JSON.parse(localStorage.getItem('password'));
   await  this.af.auth.createUserWithEmailAndPassword(form.value["Email"],form.value["Password"]).then(()=>
  { this.af.auth.sendPasswordResetEmail(form.value["Email"]);
   this.firebase.database.ref('Employee').push(
    form.value
  )
  this.af.auth.signInWithEmailAndPassword(email,password);
  this.msg="";
   }).catch((error)=>
   {
    if (error.toString().includes("The email address is already in use by another account."))
    this.msg = "Địa chỉ email đã được sử dụng bởi tài khoản khác."
  else
    if (error.toString().includes("The custom token format is incorrect. Please check the documentation."))
      this.msg = "Định dạng mã thông báo tùy chỉnh không chính xác. Vui lòng kiểm tra tài liệu."
    else
      if (error.toString().includes("The custom token corresponds to a different audience."))
        this.msg = "Mã thông báo tùy chỉnh tương ứng với một đối tượng khác."
      else
        if (error.toString().includes("The supplied auth credential is malformed or has expired."))
          this.msg = "Thông tin xác thực được cung cấp không đúng định dạng hoặc đã hết hạn."
        else
          if (error.toString().includes("The email address is badly formatted."))
            this.msg = "Địa chỉ email được định dạng sai."
          else
            if (error.toString().includes("The password is invalid or the user does not have a password."))
              this.msg = "Mật khẩu không hợp lệ."
            else
              if (error.toString().includes("The supplied credentials do not correspond to the previously signed in user."))
                this.msg = "Thông tin đăng nhập được cung cấp không tương ứng với người dùng đã đăng nhập trước đó."
              else
                if (error.toString().includes("This operation is sensitive and requires recent authentication. Log in again before retrying this request."))
                  this.msg = "Thao tác này rất nhạy cảm và yêu cầu xác thực gần đây. Đăng nhập lại trước khi thử lại yêu cầu này."
                else
                  if (error.toString().includes("An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."))
                    this.msg = "Một tài khoản đã tồn tại với cùng một địa chỉ email nhưng thông tin đăng nhập khác nhau. Đăng nhập bằng nhà cung cấp được liên kết với địa chỉ email này."
                  else
                    if (error.toString().includes("This credential is already associated with a different user account."))
                      this.msg = "Thông tin đăng nhập này đã được liên kết với một tài khoản người dùng khác."
                    else
                      if (error.toString().includes("The user account has been disabled by an administrator."))
                        this.msg = "Tài khoản người dùng đã bị vô hiệu hóa bởi quản trị viên."
                      else
                        if (error.toString().includes("The user's credential is no longer valid. The user must sign in again."))
                          this.msg = "Thông tin đăng nhập của người dùng không còn hợp lệ. Người dùng phải đăng nhập lại."
                        else
                          if (error.toString().includes("There is no user record corresponding to this identifier. The user may have been deleted."))
                            this.msg = "Tài khoản người dùng không chính xác hoặc có thể đã bị xóa."
                          else
                            if (error.toString().includes("The user's credential is no longer valid. The user must sign in again."))
                              this.msg = "Thông tin đăng nhập của người dùng không còn hợp lệ. Người dùng phải đăng nhập lại."
                            else
                              if (error.toString().includes("This operation is not allowed. You must enable this service in the console."))
                                this.msg = "Thao tác này không được phép. Bạn phải kích hoạt dịch vụ này trong bảng điều khiển."
                              else
                                if (error.toString().includes("There is no user record corresponding to this identifier"))
                                  this.msg = "Tài khoản không tồn tại hoặc đã xóa."
                                else
                                  this.msg = "Không thể thêm";
   });

}
async update(form :NgForm)
{
  if (form.value["Id"]!=null)
  this.firebase.database.ref('Employee/'+form.value["Id"]).update(
    {
      Firstname : form.value["Firstname"],
      Lastname : form.value["Lastname"],
      Phone : form.value["Phone"],
      Address :form.value["Address"],
      Birthday : form.value["Birthday"],
      Image : form.value["Image"],
      Position : form.value["Position"],
      Status : form.value["Status"],
   }
  ).then(()=>
  {
    this.msg="";
  }
  ).
  catch((error)=>
  {
    this.msg = "Không thể sửa";
  });

}
}
