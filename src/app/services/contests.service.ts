import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
import { user } from '../containers/default-layout/default-layout.component';
export interface Contest {

  Id: string,
  Id_Top: string, 
  Description: string,
  Max_Point: number,
  Time_Left: number,
  Employee_Create:string,
  Date_Create:Date,
  Employee_Edit:string,
  Date_Edit:Date,
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
        Description:'',
        Max_Point: 0,
        Time_Left: 0,
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
      this.data={...this.formData};
    } else {
      this.resetForm(1);
    }
  }

  async insert(form: NgForm) {
    var date=new Date();
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    var hour=date.getHours();
    var min=date.getMinutes();
    var sec=date.getSeconds();
    var dt=y+'/'+(m>9?m:('0'+m))+'/'+(d>9?d:('0'+d))+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
    form.value["Employee_Create"]=user["Id"];
    form.value["Employee_Edit"]=user["Id"];
    form.value["Date_Create"]=dt;
     form.value["Date_Edit"]=dt;
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
    {
      var date=new Date();
      var y=date.getFullYear();
      var m=date.getMonth()+1;
      var d=date.getDate();
      var hour=date.getHours();
      var min=date.getMinutes();
      var sec=date.getSeconds();
      var dt=y+'/'+(m>9?m:('0'+m))+'/'+(d>9?d:('0'+d))+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
      this.firebase.database.ref('Contest/' + form.value["Id"]).update(
        {
          Id_Top: form.value["Id_Top"],
          Description: form.value["Description"],
          Max_Point: form.value["Max_Point"],
          Time_Left: form.value["Time_Left"],
          Employee_Edit: user["Id"],     
          Date_Edit: dt,
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
}
