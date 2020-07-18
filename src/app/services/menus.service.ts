import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
export interface Menu
{

    Id: string,
    Name: string,
    Icon:  string,
    Url:  string,
    Group : string,
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
      Icon: '',
      Url: '',
      Group:'0',
      Status : 1
    };
  }
  else
  {
    this.formData=await JSON.parse(localStorage.getItem("menu_data"));
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
  showModal(obj: Menu) {
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      localStorage.setItem("topic_data",JSON.stringify( this.formData));

    } else {
      this.resetForm(1);
    }
  }

 async insert(form :NgForm)
 {
  await this.firebase.database.ref('Topic').orderByChild("Name").equalTo(form.value["Name"]).once("value", (value) => {
    if (value.exists()) {
      this.msg = "Chủ Đề Đã Tồn Tại";
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
  if (form.value["Id"]!=null)
  this.firebase.database.ref('Menu/'+form.value["Id"]).update(
    {
      Name:  form.value["Name"],
      Icon:  form.value["Icon"],
      Group: form.value["Group"],
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
