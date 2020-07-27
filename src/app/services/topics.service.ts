import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
import { user } from '../containers/default-layout/default-layout.component';
export interface Topic
{

    Id: string,
    Name_Top: string,
    Image:  string,
    Employee_Create:string,
    Date_Create:Date,
    Employee_Edit:string,
    Date_Edit:Date,
    Status : number 
}
@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  formData : Topic;
  list : Topic[]
  data : Topic;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase : AngularFireDatabase) { }
 async resetForm(type) {
    if (type==1)
    {
    this.formData = {
      Id:'',
      Name_Top: '',
      Image: 'https://firebasestorage.googleapis.com/v0/b/adminiq-e827c.appspot.com/o/logo.png?alt=media&token=718ae6f5-7597-417c-9770-f2d3797017cb',
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
        this.firebase.database.ref('Topic').once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
    getCkList()
    {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Topic').orderByChild("Status").equalTo(1).once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
    showModal(obj: Topic) {
      if (obj != null) {
        this.formData = Object.assign({}, obj); 
        this.data={...this.formData}
      } else {
        this.resetForm(1);
      }
    }

 async insert(form :NgForm)
 {
  await this.firebase.database.ref('Topic').orderByChild("Name_Top").equalTo(form.value["Name_Top"]).once("value", (value) => {
    if (value.exists()) {
      this.msg = "Chủ Đề Đã Tồn Tại";
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
      form.value["Employee_Create"]=user["Id"];
      form.value["Employee_Edit"]=user["Id"];
      form.value["Date_Create"]=dt;
       form.value["Date_Edit"]=dt;
      this.firebase.database.ref('Topic').push(
        form.value
      ).then(() => {
        this.msg = "";
      }).catch(() => {
        this.msg = "Không thể Thêm";
      })
    }
  });
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
  this.firebase.database.ref('Topic/'+form.value["Id"]).update(
    {
      Image : form.value["Image"],
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
