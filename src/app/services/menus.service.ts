import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
import { user } from '../containers/default-layout/default-layout.component';
export interface Menu
{
    Id: string,
    Name: string,
    Table:string,
    Icon:  string,
    Url:  string,
    Group : string,
    Color: string,
    Employee_Create:string,
    Date_Create:Date,
    Employee_Edit:string,
    Date_Edit:Date,
    Status : number
}
@Injectable({
  providedIn: 'root'
})
export class MenusService {
  formData : Menu;
  list : Menu[]
  data : Menu;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase : AngularFireDatabase) { }
  async resetForm(type) {
    if (type==1)
    {
    this.formData = {
      Id:'',
      Name: '',
      Table: '',
      Icon: 'fa-user',
      Url: '',
      Group:'',
      Color:'#23282c',
      Employee_Create:'',
      Date_Create:new Date(),
      Employee_Edit:'',
      Date_Edit:new Date(),
      Status : 1
    };
    }
    else
    {
      this.formData={...this.data};
    }
  }
    getList() {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Menu').once("value",snapshot=>
        resolve(snapshot.toJSON()),(error)=>reject(error))
      });
    }
    getCkList()
    {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Menu').orderByChild("Status").equalTo(1).once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
    getCkList_Count(tb:string,stt:boolean)
    {
      return new Promise<any>((resolve) => {
        stt?this.firebase.database.ref(tb).orderByChild("Status").equalTo(1).once("value",(value)=>
        {
        resolve(value.numChildren()
        )
        }):
        this.firebase.database.ref(tb).once("value",(value)=>
        {
        resolve(value.numChildren()
        )
        })
      });
    }
  showModal(obj: Menu) {
    if (obj != null) {
      this.formData = Object.assign({}, obj); 
      this.data={...this.formData}
    } else {
      this.resetForm(1);
    }
  }

 async insert(form :NgForm)
 {
  await this.firebase.database.ref('Menu').orderByChild("Name").equalTo(form.value["Name"]).once("value", (value) => {
    if (value.exists()) {
      this.msg = "Menu Đã Tồn Tại";
    }
    else {
      form.value["Name"]=form.value["Name"].trim().toLowerCase();
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
      this.firebase.database.ref('Menu').push(
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
    this.firebase.database.ref('Menu/'+form.value["Id"]).update(
        {
          Name:  form.value["Name"],
          Table:  form.value["Table"],
          Url:  form.value["Url"],
          Icon:  form.value["Icon"],
          Group: form.value["Group"],
          Color: form.value["Color"],
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
  else
  {
    this.msg = "Phần tử rỗng";
  }
}
}
