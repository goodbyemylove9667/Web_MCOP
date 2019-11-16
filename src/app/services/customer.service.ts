import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from '@angular/forms';
import { ApiService } from './api.service';
import { reject } from 'q';
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
  resetForm(type) {
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
        Image: 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png',
        Status: 1
      };
    }
    else {
      this.formData = this.data;
      this.data = this.formData;
    }
  }
  getList() {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Customer').orderByKey().once("value", (value) =>
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
      this.data = obj;

    } else {
      this.resetForm(1);
    }
  }

  async insert(form: NgForm) {
   await this.firebase.database.ref('Customer').orderByChild("Username").equalTo(form.value["Username"]).once("value", (value) => {
      if (value.exists()) {
        this.msg = "Tài Khoản Đã Tồn Tại";
      }
      else {
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
      this.firebase.database.ref('Customer/' + form.value["Id"]).update(
        {
          Fullname: form.value["Fullname"],
          Email: form.value["Email"],
          Phone: form.value["Phone"],
          Address: form.value["Address"],
          Birthday: form.value["Birthday"],
          Image: form.value["Image"],
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
