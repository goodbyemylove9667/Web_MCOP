import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject, async } from 'q';
import { user } from '../containers/default-layout/default-layout.component';
export interface Question {

  Id: string,
  Id_Top: string,
  Content_Ques: string,
  Answer1: string,
  Answer2: string,
  Answer3: string,
  Answer4: string,
  Answer: number,
  Level: number,
  Employee_Create:string,
  Date_Create:Date,
  Employee_Edit:string,
  Date_Edit:Date,
  Status: number
}
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  formData: Question;
  list: Question[]
  data: Question;
  ls: {};
  msg: any;
  loading: boolean;
  constructor(private firebase: AngularFireDatabase) { }
 async resetForm(type) {
    if (type == 1) {
      this.formData = {
        Id: '',
        Id_Top: '',
        Content_Ques: '',
        Answer1: '',
        Answer2: '',
        Answer3: '',
        Answer4: '',
        Answer: 1,
        Level:1,
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
      this.firebase.database.ref('Question').once("value", (value) =>
        resolve(value.toJSON()), (error) => reject(error))
    });
  }
  getCkList()
  {
    return new Promise<Object>((resolve) => {
      this.firebase.database.ref('Question').orderByChild("Status").equalTo(1).once("value",(value)=>
      resolve(value.toJSON()),(error)=>reject(error))
    });
  }
  showModal(obj: Question) {
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
    this.firebase.database.ref('Question').push(
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
      this.firebase.database.ref('Question/' + form.value["Id"]).update(
        {
          Id_Top: form.value["Id_Top"],
          Content_Ques: form.value["Content_Ques"],
          Answer1: form.value["Answer1"],
          Answer2: form.value["Answer2"],
          Answer3: form.value["Answer3"],
          Answer4: form.value["Answer4"],
          Answer: form.value["Answer"],
          Level:form.value["Level"],
          Employee_Edit: user["Id"],     
          Date_Edit: dt,
          Status: form.value["Status"]
        }
      ).then(() => {
        this.msg = "";
      }
      ).
        catch((error) => {
          this.msg = "Không thể sửa";
        });
      }
  }
}
