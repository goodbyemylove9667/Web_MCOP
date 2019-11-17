import { Component, OnInit } from '@angular/core';
import { IncludesService, Include } from '../../services/includes.service';
import { TopicsService, Topic } from '../../services/topics.service';
import { EmployeeService } from '../../services/employee.service';
import { QuestionsService, Question } from '../../services/questions.service';
import { ContestsService, Contest } from '../../services/contests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-includes',
  templateUrl: './includes.component.html',
  styleUrls: ['./includes.component.scss']
})
export class IncludesComponent implements OnInit {

  constructor(private service: IncludesService,private topservice: TopicsService,private conservice:ContestsService,private quesservice: QuestionsService,private toastr: ToastrService) { }
  Id_Top: '';
  Id_Con: '';
  Id_Ques: '';
  temp: '';
  list: Array<Include> = [];
  listTop: Array<Topic> = [];
  objTop: any;
  listCon: Array<Contest> = [];
  objCon: any;
  listQues: Array<Question> = [];
  objQues: any;
  objInc: any={};
  chk: boolean=false;
  ngOnInit() {
    this.topservice.getCkList().then((res) => {
      for (let key in res) {
          this.listTop.push
            ({
              Id: key,
              Name_Top: res[key].Name_Top,
              Image: res[key].Image,
              Status: res[key].Status
            }
            )
        }
        this.objTop=res;
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
      });
      this.conservice.getCkList().then((res) => {
        for (let key in res) {
            this.listCon.push
              ({
                Id: key,
                Id_Top: res[key].Id_Top,
                Max_Point:res[key].Max_Point,
                Time_Left:res[key].Time_Left,
                Status: res[key].Status
              }
              )
          }
          this.objCon=res;
        }, error => {
          this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
        });
        this.quesservice.getCkList().then((res) => {
          for (let key in res) {
              this.listQues.push
                ({
                  Id: key,
                  Id_Top:  res[key].Id_Top,
                  Id_Author:  res[key].Id_Author,
                  Content_Ques:  res[key].Content_Ques,
                  Answer1:  res[key].Answer1,
                  Answer2:  res[key].Answer2,
                  Answer3:  res[key].Answer3,
                  Answer4:  res[key].Answer4,
                  Answer:  res[key].Answer,
                  Create_Date : res[key].Create_Date,
                  Status:  res[key].Status
                }
                )
            }
            this.objQues=res;
          }, error => {
            this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
          });
  }
  refresh()
  {
    this.Id_Top= '';
    this.Id_Con= '';
    this.Id_Ques= '';
    this.temp= '';
    this.list = [];
    this.listTop = [];
    this.objTop= {};
    this.listCon= [];
    this.objCon= {};
    this.listQues= [];
    this.objQues= {};
    this.objInc={};
    this.chk=false;
    this.topservice.getCkList().then((res) => {
      for (let key in res) {
          this.listTop.push
            ({
              Id: key,
              Name_Top: res[key].Name_Top,
              Image: res[key].Image,
              Status: res[key].Status
            }
            )
        }
        this.objTop=res;
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
      });
      this.conservice.getCkList().then((res) => {
        for (let key in res) {
            this.listCon.push
              ({
                Id: key,
                Id_Top: res[key].Id_Top,
                Max_Point:res[key].Max_Point,
                Time_Left:res[key].Time_Left,
                Status: res[key].Status
              }
              )
          }
          this.objCon=res;
        }, error => {
          this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
        });
        this.quesservice.getCkList().then((res) => {
          for (let key in res) {
              this.listQues.push
                ({
                  Id: key,
                  Id_Top:  res[key].Id_Top,
                  Id_Author:  res[key].Id_Author,
                  Content_Ques:  res[key].Content_Ques,
                  Answer1:  res[key].Answer1,
                  Answer2:  res[key].Answer2,
                  Answer3:  res[key].Answer3,
                  Answer4:  res[key].Answer4,
                  Answer:  res[key].Answer,
                  Create_Date : res[key].Create_Date,
                  Status:  res[key].Status
                }
                )
            }
            this.objQues=res;
          }, error => {
            this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
          });
  }
  initTop()
  {
    this.Id_Con=this.temp;
    this.Id_Ques=this.temp;
    this.chk=false;
  }
  initCon()
  {
    this.Id_Ques=this.temp;
    this.chk=false;
    this.objInc={};
    this.service.getConList(this.Id_Con).then((res) => {
      for (let key in res) {
          this.list.push
            ({
              Id: key,
              Id_Con:  res[key].Id_Con,
              Id_Ques:  res[key].Id_Ques
            }
            );
            this.objInc[res[key].Id_Ques]=key;
        }
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
      });
      console.log(this.objInc);
  }
  changeCon(s)
  {
    if (s.length>30)
    return s.substring(0,29)+"..."
    else return s;
  }
  checkall()
  {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]') ;
    for (var i = 1; i < checkboxes.length; i++) {
     var ck: HTMLInputElement ;
         ck=<HTMLInputElement>checkboxes[i];
         ck.checked=!this.chk;
         this.submitall(ck.value);
    }
    this.chk=!this.chk;
  }
  submitall(Id_Ques)
  {
    if ( this.objInc.hasOwnProperty(Id_Ques) &&  this.chk)
    {
      this.service.delete( this.objInc[Id_Ques]);
      delete this.objInc[Id_Ques];
      console.log(this.objInc);
    }
    else
    if (this.chk==false && !this.objInc.hasOwnProperty(Id_Ques))
    { 
      this.service.insert(this.Id_Con,Id_Ques).then((value)=>
      {
        this.objInc[Id_Ques]=value;
      });
      console.log(this.objInc);
    }
  }
  submit(Id_Ques)
  {
    console.log(this.objInc);
      if ( this.objInc.hasOwnProperty(Id_Ques))
      {
        this.service.delete( this.objInc[Id_Ques]);
        delete this.objInc[Id_Ques];
        console.log(this.objInc);
      }
      else
      {
        this.service.insert(this.Id_Con,Id_Ques).then((value)=>
        {
          this.objInc[Id_Ques]=value;
        });
        console.log(this.objInc);
      }
  }
  showques(id)
{
  this.Id_Ques=id;
  console.log(this.Id_Ques);
}
}
