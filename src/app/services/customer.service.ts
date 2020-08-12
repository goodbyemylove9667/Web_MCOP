import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';
import { reject, async } from 'q';
import { user } from '../containers/default-layout/default-layout.component';
export interface Customer {

  Id: string,
  Username: string,
  Password: string,
  Fullname: string,
  Email: string,
  Phone: string,
  Address: string,
  Birthday: Date,
  Image: string,
  Facebook:string,
  Google:string,
  Employee_Create:string,
  Date_Create:Date,
  Employee_Edit:string,
  Date_Edit:Date,
  Status: number
}
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  formData: Customer;
  list: Customer[]
  data: Customer;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase: AngularFireDatabase) { }
 async resetForm(type) {
    if (type == 1) {
      this.formData = {
        Id: '',
        Username: '',
        Password: 'abc123',
        Fullname: '',
        Email: '',
        Phone: '',
        Address: '',
        Birthday: new Date(),
        Image: 'https://firebasestorage.googleapis.com/v0/b/adminiq-e827c.appspot.com/o/user-png-icon-male-user-icon-512.png?alt=media&token=883823b5-18fd-4d82-9a80-812c95839225',
        Facebook:'',
        Google:'',
        Employee_Create:'',
        Date_Create:new Date(),
        Employee_Edit:'',
        Date_Edit:new Date(),
        Status: 1
      };
    }
    else {
      this.formData=this.data;
    }
  }
  getList() {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Customer').once("value", (value) =>
        resolve(value.toJSON()), (error) => reject(error))
    });
  }
  getCkList()
  {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Customer').orderByChild("Status").equalTo(1).once("value",(value)=>
      resolve(value.toJSON()),(error)=>reject(error))
    });
  }
  showModal(obj: Customer) {
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      this.data={...this.formData};
    } else {
      this.resetForm(1);
    }
  }

  async insert(form: NgForm) {
    form.value["Username"]=form.value["Username"].trim().toLowerCase();
   await this.firebase.database.ref('Customer').orderByChild("Username").equalTo(form.value["Username"]).limitToFirst(1).once("value", (value) => {
      if (value.exists()) {
        this.msg = "Tài Khoản Đã Tồn Tại";
      }
      else {
        var date=new Date();
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        var hour=date.getHours();
        var min=date.getMinutes();
        var sec=date.getSeconds();
        var dt=y+'/'+(m>9?m:('0'+m))+'/'+(d>9?d:('0'+d))+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
        form.value["Birthday"]=form.value["Birthday"].toString();
        form.value["Employee_Create"]=user["Id"];
        form.value["Employee_Edit"]=user["Id"];
        form.value["Date_Create"]=dt;
         form.value["Date_Edit"]=dt;
        this.firebase.database.ref('Customer').push(
          form.value
        ).then(() => {
          this.msg = "";
        }).catch(() => {
          this.msg = "Không thể Thêm";
        })
      }
    });
}
  async update(form: NgForm) {
    if (form.value["Id"] != null)
    {
      var date=new Date();
      var y=date.getFullYear();
      var m=date.getMonth()+1;
      var d=date.getDate();
      var hour=date.getHours();
      var min=date.getMinutes();
      var sec=date.getSeconds();
      var dt=y+'/'+(m>9?m:('0'+m))+'/'+(d>9?d:('0'+d))+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
      this.firebase.database.ref('Customer/' + form.value["Id"]).update(
        {
          Fullname: form.value["Fullname"],
          Email: form.value["Email"],
          Phone: form.value["Phone"],
          Address: form.value["Address"],
          Birthday: form.value["Birthday"],
          Facebook: form.value["Facebook"],
          Google: form.value["Google"],
          Image: form.value["Image"],
          Employee_Edit: user["Id"],     
          Date_Edit: dt,
          Status: form.value["Status"],
        }
      ).then(() => {
        this.msg = "";
      }
      ).
        catch((error) => {
          this.msg = "Không thể sửa";
        });
      }
  }
}
