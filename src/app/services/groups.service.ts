import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
export interface Group
{
    Id: string,
    Name: string,
    Status : number
}
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  formData : Group;
  list : Group[]
  data : Group;
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
        this.firebase.database.ref('Group').once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
    getCkList()
    {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Group').orderByChild("Status").equalTo(1).once("value",(value)=>
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
  showModal(obj: Group) {
    if (obj != null) {
      this.formData = Object.assign({}, obj);
      localStorage.setItem("Group_data",JSON.stringify( this.formData));

    } else {
      this.resetForm(1);
    }
  }

 async insert(form :NgForm)
 {
  await this.firebase.database.ref('Group').orderByChild("Name").equalTo(form.value["Name"]).once("value", (value) => {
    if (value.exists()) {
      this.msg = "Group Đã Tồn Tại";
    }
    else {
      this.firebase.database.ref('Group').push(
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
  this.firebase.database.ref('Group/'+form.value["Id"]).update(
    {
      Name:  form.value["Name"],
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
