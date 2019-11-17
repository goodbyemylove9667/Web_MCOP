import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
export interface Include
{

    Id: string,
    Id_Con: string,
    Id_Quest: string,
}
@Injectable({
  providedIn: 'root'
})
export class IncludesService {

  formData : Include;
  list : Include[]
  data : Include;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase : AngularFireDatabase) { }
  resetForm() {
    this.formData = {
      Id: '',
      Id_Con: '',
      Id_Quest: ''
    };
  }
    getList() {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Include').once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
   async delete(key)
    {
      await this.firebase.database.ref('Include/'+key).remove().then(()=>
      {
        this.msg="";
      }).catch(()=>
      {
        this.msg="Không Thể Xóa";
      })
    }
    showModal(obj: Include) {
      if (obj != null) {
        this.formData = Object.assign({}, obj);
        this.data = obj;
      }
    }
}
