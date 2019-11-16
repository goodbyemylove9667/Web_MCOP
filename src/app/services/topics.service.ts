import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
export interface Topic
{

    Id: string,
    Name_Top: string,
    Image:  string,
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
  resetForm(type) {
    if (type==1)
    {
    this.formData = {
      Id:'',
      Name_Top: '',
      Image: 'https://www.clipartwiki.com/clipimg/detail/99-996598_technology-icons-clip-art-clip-art-information-technology.png',
      Status : 1
    };
  }
  else
  {
    this.formData=this.data;
    this.data=this.formData;
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
      this.data = obj;

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
  this.firebase.database.ref('Topic/'+form.value["Id"]).update(
    {
      Image : form.value["Image"],
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
