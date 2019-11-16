import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject } from 'q';
export interface Result
{

    Id: string,
    Id_Cus: string,
    Id_Con: string,
    Point : number,
    TimeLeft_Res : number,
    Date_Res: string
}
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  formData : Result;
  list : Result[]
  data : Result;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase : AngularFireDatabase) { }
  resetForm() {
    this.formData = {
      Id: '',
      Id_Cus: '',
      Id_Con: '',
      Point : 0,
      TimeLeft_Res : 0,
      Date_Res: ''
    };
  }
    getList() {
      return new Promise<Object>((resolve) => {
        this.firebase.database.ref('Result').once("value",(value)=>
        resolve(value.toJSON()),(error)=>reject(error))
      });
    }
   async delete(key)
    {
      await this.firebase.database.ref('Result/'+key).remove().then(()=>
      {
        this.msg="";
      }).catch(()=>
      {
        this.msg="Không Thể Xóa";
      })
    }
    showModal(obj: Result) {
      if (obj != null) {
        this.formData = Object.assign({}, obj);
        this.data = obj;
      }
    }

}
