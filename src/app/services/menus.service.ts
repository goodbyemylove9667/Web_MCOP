import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
import { DefaultLayoutComponent, user } from '../containers';
export interface Menu
{
    Id: string,
    Name: string,
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
        this.firebase.database.ref('Menu').once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
    getCkList()
    {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Menu').orderByChild("Status").equalTo(1).once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
    getCkList_Count(tb:string)
    {
      return new Promise<any>((resolve) => {
        this.firebase.database.ref(tb).orderByChild("Status").equalTo(1).once("value",(value)=>
        resolve(value.numChildren()))
      });
    }
  showModal(obj: Menu) {
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      localStorage.setItem("Menu_data",JSON.stringify( this.formData));

    } else {
      this.resetForm(1);
    }
  }

 async insert(form :NgForm)
 {
  var date=new Date();
  var dt=date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+' '+date.getHours()+'/'+date.getMinutes()+'/'+date.getSeconds();
  form.value["Date_Create"]=dt;
   form.value["Date_Edit"]=dt;
  await this.firebase.database.ref('Menu').orderByChild("Name").equalTo(form.value["Name"]).once("value", (value) => {
    if (value.exists()) {
      this.msg = "Menu Đã Tồn Tại";
    }
    else {
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
  var date=new Date();
  if (form.value["Id"]!=null)
  this.firebase.database.ref('Menu/'+form.value["Id"]).update(
    {
      Name:  form.value["Name"],
      Icon:  form.value["Icon"],
      Group: form.value["Group"],
      Color: form.value["Color"],
      Employee_Edit: user["Id"],     
      Date_Edit: date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+' '+date.getHours()+'/'+date.getMinutes()+'/'+date.getSeconds(),
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
