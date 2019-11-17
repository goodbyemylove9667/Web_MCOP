import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { reject, async } from 'q';
export interface Question {

  Id: string,
  Id_Top: string,
  Id_Author: string,
  Content_Ques: string,
  Answer1: string,
  Answer2: string,
  Answer3: string,
  Answer4: string,
  Answer: number,
  Create_Date :Date,
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
    var data=JSON.parse(localStorage.getItem('keyUser'));
    console.log(data);
    if (type == 1) {
      this.formData = {
        Id: '',
        Id_Top: '',
        Id_Author: data,
        Content_Ques: '',
        Answer1: '',
        Answer2: '',
        Answer3: '',
        Answer4: '',
        Answer: 1,
        Create_Date :new Date(),
        Status: 1
      };
    }
    else {
      this.formData=await JSON.parse(localStorage.getItem("question_data"));
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
      localStorage.setItem("question_data",JSON.stringify( this.formData));

    } else {
      this.resetForm(1);
    }
  }

  async insert(form: NgForm) {
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
      this.firebase.database.ref('Question/' + form.value["Id"]).update(
        {
          Id_Top: form.value["Id_Top"],
          Id_Author: form.value["Id_Author"],
          Content_Ques: form.value["Content_Ques"],
          Answer1: form.value["Answer1"],
          Answer2: form.value["Answer2"],
          Answer3: form.value["Answer3"],
          Answer4: form.value["Answer4"],
          Answer: form.value["Answer"],
          Create_Date :form.value["Create_Date"],
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
