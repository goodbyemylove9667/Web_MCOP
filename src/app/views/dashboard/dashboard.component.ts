import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AngularFireDatabase } from '@angular/fire/database';
import { Result, ResultsService } from '../../services/results.service';
import { Topic, TopicsService } from '../../services/topics.service';
import { EmployeeService } from '../../services/employee.service';
import { CustomerService } from '../../services/customer.service';
import { QuestionsService } from '../../services/questions.service';
import { ContestsService } from '../../services/contests.service';
import { IncludesService } from '../../services/includes.service';

@Component({
  selector: 'app-contests',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private empservice: EmployeeService,private cusservice: CustomerService,private quesservice: QuestionsService,private topservice: TopicsService,private conservice: ContestsService,private incservice: IncludesService,private resservice: ResultsService) { }
  emp_sl:number=0;
  cus_sl:number=0;
  quest_sl:number=0;
  top_sl:number=0;
  con_sl:number=0;
  inc_sl:number=0;
  listRes: Array<Result> = [];
  listTop: Array<Topic> = [];
  award : Array<Object> =[];
  OjbCon: any={};
  OjbCus: any={};
  radioModel: string = 'Month';

 async ngOnInit() {

  this.empservice.getAllList().then((value)=>
  {
    this.emp_sl=Object.getOwnPropertyNames(value).length;     
  });
  this.cusservice.getList().then((value)=>
  {
    this.cus_sl=Object.getOwnPropertyNames(value).length; 
    this.OjbCus=value;
  });
  this.conservice.getList().then((value)=>
  {
    this.con_sl=Object.getOwnPropertyNames(value).length; 
    this.OjbCon=value;
  });
  var x = document.getElementById("slc_db");
  var chck=1;
  var dfkey='';
  this.topservice.getList().then((value)=>
  {
    this.top_sl=Object.getOwnPropertyNames(value).length; 
    for (let key in value) {
      var option = document.createElement("option");
      option.text = value[key].Name_Top;
      option.value=key;
      if (chck)
      {
      dfkey=key;
      chck=0;
      }
      x.appendChild(option);
    }
  }); 
  this.quesservice.getList().then((value)=>
  {
    this.quest_sl=Object.getOwnPropertyNames(value).length; 
  });
  this.resservice.getorderList().then((value)=>
  {
    value.forEach((data)=>
    {
        this.listRes.push({
          Id: data.key,
          Id_Cus: data.toJSON().Id_Cus,
          Id_Con:  data.toJSON().Id_Con,
          Point :  data.toJSON().Point,
          TimeLeft_Res :  data.toJSON().TimeLeft_Res,
          Date_Res:  data.toJSON().Date_Res
        })
    })
this.listRes.reverse();
var count=0;
var table = <HTMLTableElement>document.getElementById("tb_db");
  for (var res of this.listRes)
  {
    if (this.OjbCon[res.Id_Con].Id_Top==dfkey)
    {
        count++;
        var row = table.insertRow();
        row.className="font-weight-bolder";
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3   = row.insertCell(2);
        cell3.className="text-danger";
        cell1.innerHTML = count.toString();
        cell2.innerHTML = this.OjbCus[res.Id_Cus].Username.toString();
        cell3.innerHTML =  res.Point.toString()+"đ";
    }
    if (count==10) break;
  }
  });
  
 }
 change()
 {
  var x = (<HTMLInputElement>document.getElementById("slc_db")).value;
  var count=0;
var table = <HTMLTableElement>document.getElementById("tb_db");
table.innerHTML="";
var header = table.createTHead();
var row = header.insertRow();
row.className="bg-primary";
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3   = row.insertCell(2);
cell3.className="text-danger";
cell1.innerHTML = "STT";
cell2.innerHTML = "Tài Khoản";
cell3.innerHTML =  "Điểm";
row.innerHTML='<tr><th>STT</th><th>Tài Khoản</th><th>Điểm</th></tr>';
  for (var res of this.listRes)
  {
    if (this.OjbCon[res.Id_Con].Id_Top==x)
    {
        count++;
        var row = table.insertRow();
        row.className="font-weight-bolder";
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3   = row.insertCell(2);
        cell1.innerHTML = count.toString();
        cell2.innerHTML = this.OjbCus[res.Id_Cus].Username.toString();
        cell3.innerHTML =  res.Point.toString()+"đ";
    }
    if (count==10) break;
  }
 }
}
