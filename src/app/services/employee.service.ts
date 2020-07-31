import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from  "@angular/fire/auth";
import { NgForm } from '@angular/forms';
import { reject } from 'q';
import { user } from '../containers/default-layout/default-layout.component';
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
    Group : number ,
    Employee_Create:string,
    Date_Create:Date,
    Employee_Edit:string,
    Date_Edit:Date,
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
  constructor(private firebase : AngularFireDatabase,private af:AngularFireAuth) { }
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
      Image: 'https://firebasestorage.googleapis.com/v0/b/adminiq-e827c.appspot.com/o/user-png-icon-male-user-icon-512.png?alt=media&token=883823b5-18fd-4d82-9a80-812c95839225',
      Group : 1,
      Employee_Create:'',
      Date_Create:new Date(),
      Employee_Edit:'',
      Date_Edit:new Date(),
      Status : 1
    };
  }
  else
  {
    this.formData=this.data;
  }
  }
  getList() {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Employee').once("value",(value)=>
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
    this.data={...this.formData};

    } else {
      this.resetForm(1);
    }
  }
async insert(form :NgForm)
 {
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
  this.firebase.database.ref('Employee').push(
    form.value
  );
  this.msg="";
  this.af.auth.sendPasswordResetEmail(form.value["Email"]).then().catch();
}
async update(form :NgForm)
{
  if (form.value["Id"]!=null)
{
  var date=new Date();
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var hour=date.getHours();
  var min=date.getMinutes();
  var sec=date.getSeconds();
  var dt=y+'/'+(m>9?m:('0'+m))+'/'+(d>9?d:('0'+d))+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
  this.firebase.database.ref('Employee/'+form.value["Id"]).update(
    {
      Firstname : form.value["Firstname"],
      Lastname : form.value["Lastname"],
      Phone : form.value["Phone"],
      Address :form.value["Address"],
      Birthday : form.value["Birthday"],
      Image : form.value["Image"],
      Group : form.value["Group"],
      Employee_Edit: user["Id"],     
      Date_Edit: dt,
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
}
