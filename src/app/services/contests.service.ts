import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
export interface Contest {

  Id: string,
  Id_Top: string,
  Max_Point: number,
  Time_Left: number,
  Status: number
}
@Injectable({
  providedIn: 'root'
})
export class ContestsService {

  formData: Contest;
  list: Contest[]
  data: Contest;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase: AngularFireDatabase) { }
 async resetForm(type) {
    if (type == 1) {
      this.formData = {
        Id: '',
        Id_Top: '',
        Max_Point: 0,
        Time_Left: 0,
        Status: 1
      };
    }
    else {
      this.formData=await JSON.parse(localStorage.getItem("contest_data"));
    }
  }
  getList() {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Contest').once("value", (value) =>
        resolve(value.toJSON()), (error) => reject(error))
    });
  }
  getCkList()
  {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Contest').orderByChild("Status").equalTo(1).once("value",(value)=>
      resolve(value.toJSON()),(error)=>reject(error))
    });
  }
  showModal(obj: Contest) {
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      localStorage.setItem("contest_data",JSON.stringify( this.formData));

    } else {
      this.resetForm(1);
    }
  }

  async insert(form: NgForm) {
    this.firebase.database.ref('Contest').push(
      form.value
    ).then(() => {
      this.msg = "";
    }).catch(() => {
      this.msg = "Không thể Thêm";
    });
  }
  async update(form: NgForm) {
    if (form.value["Id"] != null)
      this.firebase.database.ref('Contest/' + form.value["Id"]).update(
        {
          Id_Top: form.value["Id_Top"],
          Max_Point: form.value["Max_Point"],
          Time_Left: form.value["Time_Left"],
          Status: form.value["Status"]
        }
      ).then(() => {
        this.msg = "";
      }
      ).
        catch((error) => {
          console.log("Lỗi ",error);
          this.msg = "Không thể sửa";
        });

  }
}
