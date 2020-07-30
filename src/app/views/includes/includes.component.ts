import { Component, OnInit, ViewChild } from '@angular/core';
import { IncludesService, Include } from '../../services/includes.service';
import { TopicsService, Topic } from '../../services/topics.service';
import { QuestionsService, Question } from '../../services/questions.service';
import { ContestsService, Contest } from '../../services/contests.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-includes',
  templateUrl: './includes.component.html',
  styleUrls: ['./includes.component.scss']
})
export class IncludesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('randomModal', { static: false }) public randomModal: ModalDirective;
  @ViewChild('form', { static: false }) private form: NgForm;
  constructor(private service: IncludesService,private topservice: TopicsService,private conservice:ContestsService,private quesservice: QuestionsService,private toastr: ToastrService,public router: Router) { 
    var index=navItems.findIndex(x=>x.table=='Include');
    if (index==-1)
    {
      this.router.navigate(['']);
    }
  }
  Id_Top: '';
  Id_Con: '';
  Id_Ques: '';
  temp: '';
  De_Sl:number=0;
  Tb_Sl:number=0;
  Kho_Sl:number=0;
  list: Array<Include> = [];
  listTop: Array<Topic> = [];
  objTop: any;
  listCon: Array<Contest> = [];
  objCon: any;
  listQues: Array<Question> = [];
  objQues: any;
  objInc: any={};
  objOrder: any={};
  Action_Arr :Array<any>=[];
  ngOnInit() {
    this.topservice.getCkList().then((res) => {
      for (let key in res) {
        if (key!="-MDBLQgsR3ZDZTyrrf8_")
          this.listTop.push
            ({
              Id: key,
              Name_Top: res[key].Name_Top,
              Image: res[key].Image,
              Employee_Create:res[key].Employee_Create,
              Date_Create:res[key].Date_Create,
              Employee_Edit:res[key].Employee_Edit,
              Date_Edit:res[key].Date_Edit,
              Status: res[key].Status
            }
            )
        }
        this.objTop=res;
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 2000});
      });
      this.conservice.getCkList().then((res) => {
        for (let key in res) {
            this.listCon.push
              ({
                Id: key,
                Id_Top: res[key].Id_Top,
                Description: res[key].Description,
                Max_Point:res[key].Max_Point,
                Time_Left:res[key].Time_Left,
                Employee_Create:res[key].Employee_Create,
                Date_Create:res[key].Date_Create,
                Employee_Edit:res[key].Employee_Edit,
                Date_Edit:res[key].Date_Edit,
                Status: res[key].Status
              }
              )
          }
          this.objCon=res;
        }, error => {
          this.toastr.error( 'Không Tải Được Dữ Liệu Cuộc Thi','Thông Báo!',{timeOut: 2000});
        });
        this.quesservice.getCkList().then((res) => {
          for (let key in res) {
              this.listQues.push
                ({
                  Id: key,
                  Id_Top:  res[key].Id_Top,
                  Content_Ques:  res[key].Content_Ques,
                  Answer1:  res[key].Answer1,
                  Answer2:  res[key].Answer2,
                  Answer3:  res[key].Answer3,
                  Answer4:  res[key].Answer4,
                  Answer:  res[key].Answer,
                  Level:  res[key].Level,
                  Employee_Create:res[key].Employee_Create,
                  Date_Create:res[key].Date_Create,
                  Employee_Edit:res[key].Employee_Edit,
                  Date_Edit:res[key].Date_Edit,
                  Status:  res[key].Status
                }
                )
            }
            this.objQues=res;
          }, error => {
            this.toastr.error( 'Không Tải Được Dữ Liệu Bộ Để','Thông Báo!',{timeOut: 2000});
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
    this.topservice.getCkList().then((res) => {
      for (let key in res) {
        if (key!="-MDBLQgsR3ZDZTyrrf8_")
          this.listTop.push
            ({
              Id: key,
              Name_Top: res[key].Name_Top,
              Image: res[key].Image,
              Employee_Create:res[key].Employee_Create,
              Date_Create:res[key].Date_Create,
              Employee_Edit:res[key].Employee_Edit,
              Date_Edit:res[key].Date_Edit,
              Status: res[key].Status
            }
            )
        }
        this.objTop=res;
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 2000});
      });
      this.conservice.getCkList().then((res) => {
        for (let key in res) {
            this.listCon.push
              ({
                Id: key,
                Id_Top: res[key].Id_Top,
                Description: res[key].Description,
                Max_Point:res[key].Max_Point,
                Time_Left:res[key].Time_Left,
                Employee_Create:res[key].Employee_Create,
                Date_Create:res[key].Date_Create,
                Employee_Edit:res[key].Employee_Edit,
                Date_Edit:res[key].Date_Edit,
                Status: res[key].Status
              }
              )
          }
          this.objCon=res;
        }, error => {
          this.toastr.error( 'Không Tải Được Dữ Liệu Cuộc Thi','Thông Báo!',{timeOut: 2000});
        });
        this.quesservice.getCkList().then((res) => {
          for (let key in res) {
              this.listQues.push
                ({
                  Id: key,
                  Id_Top:  res[key].Id_Top,
                  Content_Ques:  res[key].Content_Ques,
                  Answer1:  res[key].Answer1,
                  Answer2:  res[key].Answer2,
                  Answer3:  res[key].Answer3,
                  Answer4:  res[key].Answer4,
                  Answer:  res[key].Answer,
                  Level:  res[key].Level,
                  Employee_Create:res[key].Employee_Create,
                  Date_Create:res[key].Date_Create,
                  Employee_Edit:res[key].Employee_Edit,
                  Date_Edit:res[key].Date_Edit,
                  Status:  res[key].Status
                }
                )
            }
            this.objQues=res;
          }, error => {
            this.toastr.error( 'Không Tải Được Dữ Liệu Bộ Đề','Thông Báo!',{timeOut: 2000});
          });
  }
  initTop()
  {
    this.Id_Con=this.temp;
    this.Id_Ques=this.temp;
  }
  async initCon()
  {
    this.Id_Ques=this.temp;
    this.list=[];
    this.objInc={};
    this.objOrder={};
    this.Action_Arr=[];
   await  this.service.getConList(this.Id_Con).then((res) => {
      for (let key in res) {
          this.list.push
            ({
              Id: key,
              Id_Con:  res[key].Id_Con,
              Id_Ques:  res[key].Id_Ques,
              Order: res[key].Order
            }
            );
            this.objInc[res[key].Id_Ques]=key;
            this.objOrder[res[key].Id_Ques]=res[key].Order;
        }
        this.list.sort((a,b)=>(a.Order>b.Order)?1:(a.Order<b.Order)?-1:0);
      this.list.forEach((element)=>{
        this.Action_Arr.push({
          Id_Ques:element.Id_Ques,
          free:true
        });
      })
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Quan Hệ','Thông Báo!',{timeOut: 2000});
      });
  }
  changeCon(s)
  {
    if (s.length>30)
    return s.substring(0,29)+"..."
    else return s;
  }
  getCheck(Id)
  {
     var index= this.Action_Arr.findIndex(x=> x.Id_Ques==Id && x.free);
      if (index>-1) return true; else return false;
  }
  getListTop()
  {
    var arr=[];
    this.listQues.forEach((element)=>
    {
      if (element.Id_Top==this.Id_Top)
      {
        arr.push({
          Id:element.Id,
          Content_Ques: element.Content_Ques,
          Order: this.objOrder.hasOwnProperty(element.Id)?(this.objOrder[element.Id]+1):this.objOrder[element.Id]
        });
      }
    });
    arr.sort((a,b)=>{
      if (a.Order!=null && b.Order!=null)
      {
        return a.Order>b.Order?1:a.Order<b.Order?-1:0;
      }
      else
      {
          if (a.Order==null && b.Order!=null) return 1;
          if (a.Order!=null && b.Order==null) return -1;
          return 0;
      }
    });
    return arr;
  }
  select(Id_Ques)
  {
    var index=this.Action_Arr.findIndex(x=>x.Id_Ques==Id_Ques);
    if (index==-1)
    {
      this.Action_Arr.push({
        Id_Ques:Id_Ques,
         free:true
       }); 
    }
    else
    {
      if (this.objInc.hasOwnProperty(Id_Ques))
      {
        this.Action_Arr[index].free=!this.Action_Arr[index].free;
      }
      else
      {
        this.Action_Arr.splice(index,1);
      }
    }
  }
  async submit()
  {
    this.blockUI.start('Loading...'); 
    let index=0;
    this.Action_Arr.forEach((element)=>
    {
        if (element.free)
        {
          if (this.objInc.hasOwnProperty(element.Id_Ques))
          {
            if (this.objOrder[element.Id_Ques]!=index)
            this.service.update(this.objInc[element.Id_Ques],index);
          }
          else
          {
            this.service.insert(this.Id_Con,element.Id_Ques,index);
          }
          index++;
        }
        else
        {
          if (this.objInc.hasOwnProperty(element.Id_Ques))
          this.service.delete(this.objInc[element.Id_Ques]);
        }
    });
   await this.initCon();
  this.blockUI.stop();
  }
  showques(id)
{
  this.Id_Ques=id;
}
showrandom() {
  this.De_Sl=0;
  this.Tb_Sl=0;
  this.Kho_Sl=0;
  this.form.form.markAsPristine();
  this.randomModal.show();
}
 shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}
 async random()
{
  this.blockUI.start('Loading...'); 
  var arr1=[];
  var arr2=[];
  var arr3=[];
  var De_Arr=[];
  var Tb_Arr=[];
  var Kho_Arr=[];
  this.listQues.forEach((element)=>
  {
    if (element.Id_Top==this.Id_Top)
    { 
      if (element.Level==1) arr1.push(element); 
      if (element.Level==2) arr2.push(element); 
      if (element.Level==3) arr3.push(element); 
      if (this.objInc.hasOwnProperty(element.Id))
      {
        this.service.delete(this.objInc[element.Id]);
      }
    }
  });
  arr1=this.shuffle(arr1);
  arr2=this.shuffle(arr2);
  arr3=this.shuffle(arr3);
  let index1=-1;
  let index2=-1;
  let index3=-1;
  for (let i=0;i<arr1.length;i++)
  {
    if (De_Arr.length<this.De_Sl)
    {
      De_Arr.push(
        {
          Id:'',
          Id_Ques: arr1[i].Id,
          Order :0
        }
      )
    }
    else 
    {
      index1=i;
      break;
    }
  }
  for (let i=0;i<arr2.length;i++)
  {
    if (Tb_Arr.length<this.Tb_Sl)
    {
      Tb_Arr.push(
        {
          Id:'',
          Id_Ques: arr2[i].Id,
          Order :0
        }
      )
    }
    else {
      index2=i;  
      break;
    }
  };
  for (let i=0;i<arr3.length;i++)
  {
    if (Kho_Arr.length<this.Kho_Sl)
    {
      Kho_Arr.push(
        {
          Id:'',
          Id_Ques: arr3[i].Id,
          Order :0
        }
      )
    }
    else
    {
      index3=i;
      break;
    }
  };
  var total=De_Arr.length+Tb_Arr.length+Kho_Arr.length;
  var full=this.De_Sl+this.Tb_Sl+this.Kho_Sl;
  if (total<full && index1!=-1)
  {
    for (let i=index1;i<arr1.length;i++)
    {
      if (total<full)
      {
      De_Arr.push(
        {
          Id:'',
          Id_Ques: arr1[i].Id,
          Order :0
        }
      );
      total++;
      }
      else break;
    }
  }
  if (total<full && index2!=-1)
  {
    for (let i=index2;i<arr2.length;i++)
    {
      if (total<full)
      {
      Tb_Arr.push(
        {
          Id:'',
          Id_Ques: arr2[i].Id,
          Order :0
        }
      );
      total++;
      }
      else break;
    }
  }
  if (total<full && index3!=-1)
  {
    for (let i=index3;i<arr3.length;i++)
    {
      if (total<full)
      {
      Kho_Arr.push(
        {
          Id:'',
          Id_Ques: arr3[i].Id,
          Order :0
        }
      );
      total++;
      }
      else break;
    }
  }
await this.sovle(De_Arr,Tb_Arr,Kho_Arr);
await this.initCon();
this.blockUI.stop();
this.randomModal.hide();
}
async sovle(De_Arr,Tb_Arr,Kho_Arr)
{
  for (let i=0;i<De_Arr.length+Tb_Arr.length+Kho_Arr.length;i++)
  {
    if (i<De_Arr.length)
    {
        if (De_Arr[i].Id=='')
        {
          this.service.insert(this.Id_Con,De_Arr[i].Id_Ques,i);
        }
        else
        {
          this.service.update(De_Arr[i].Id,i);
        }
    }
    else
    if (i<De_Arr.length+Tb_Arr.length)
    {
      var index=i-De_Arr.length;
      if (Tb_Arr[index].Id=='')
      {
        this.service.insert(this.Id_Con,Tb_Arr[index].Id_Ques,i);
      }
      else
      {
        this.service.update(Tb_Arr[index].Id,i);
      }
    }
    else
    {
        var index=i-De_Arr.length-Tb_Arr.length;
        if (Kho_Arr[index].Id=='')
        {
          this.service.insert(this.Id_Con,Kho_Arr[index].Id_Ques,i);
        }
        else
        {
          this.service.update(Kho_Arr[index].Id,i);
        }
    }
  }
}
}
