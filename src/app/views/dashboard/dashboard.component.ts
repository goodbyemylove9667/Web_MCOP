import { Component, OnInit } from '@angular/core';
import { Result, ResultsService } from '../../services/results.service';
import { Topic, TopicsService } from '../../services/topics.service';
import { CustomerService } from '../../services/customer.service';
import { ContestsService } from '../../services/contests.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { navItems } from '../../_nav';
import { MenusService } from '../../services/menus.service';
@Component({
  selector: 'app-contests',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private cusservice: CustomerService,
    private topservice: TopicsService,private conservice: ContestsService,private menuservice: MenusService,private resservice:ResultsService) {
    this.blockUI.start('Loading...'); 
   }
  cus_sl:number=0;
  top_sl:number=0;
  con_sl:number=0;
  listRes: Array<Result> = [];
  listTop: Array<Topic> = [];
  award : Array<Object> =[];
  OjbCon: any={};
  OjbCus: any={};
  radioModel: string = 'Month';

 async ngOnInit() {
  await  this.cusservice.getList().then((value)=>
  {
    this.cus_sl=Object.getOwnPropertyNames(value).length; 
    this.OjbCus=value;
  });
 await  this.conservice.getList().then((value)=>
  {
    this.con_sl=Object.getOwnPropertyNames(value).length; 
    this.OjbCon=value;
  });
  var x = document.getElementById("slc_db");
  var chck=1;
  var dfkey='';
  await   this.topservice.getList().then((value)=>
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
  await  this.resservice.getorderList().then((value)=>
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
this.listRes.sort((a, b)=> Number ( b.Point-a.Point || (b.Point==a.Point && a.TimeLeft_Res>b.TimeLeft_Res)));
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
  var db_menu = document.getElementById("db_menu");
  var str=db_menu.attributes[0].nodeName;
  navItems.forEach(async(element)=>
  {
    if (element.url=='/customer')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-6 col-sm-3 text-decoration-none" href="`+element.url+`">
      <div `+str+` class="card text-white" style="background-color:`+element.color+`">
        <div `+str+` class="card-body py-2">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="`+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ this.cus_sl+`</div>
        </div>
      </div>
    </a>`
    }
    else
    if (element.url=='/contest')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-6 col-sm-3 text-decoration-none" href="`+element.url+`">
      <div `+str+` class="card text-white" style="background-color:`+element.color+`">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="`+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ this.con_sl+`</div>
        </div>
      </div>
    </a>`
    }
    else
    if (element.url=='/topic')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-6 col-sm-3 text-decoration-none" href="`+element.url+`">
      <div `+str+` class="card text-white" style="background-color:`+element.color+`">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="`+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ this.top_sl+`</div>
        </div>
      </div>
    </a>`
    }
   else
   if (element.url!='/dashboard')
   {
     var tb=element.url.substr(2);
     tb=element.url[1].toUpperCase()+tb;
     var sl=0;
     await this.menuservice.getCkList_Count(tb).then((value)=>
     {
       sl=value;
     }).catch(()=>{sl=0});
     db_menu.innerHTML+=`<a `+str+` class="col-6 col-sm-3 text-decoration-none" href="`+element.url+`">
      <div `+str+` class="card text-white" style="background-color:`+element.color+`">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="`+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ sl+`</div>
        </div>
      </div>
    </a>`
   }
  });
  this.blockUI.stop(); 
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
        cell3.className="text-danger";
        cell1.innerHTML = count.toString();
        cell2.innerHTML = this.OjbCus[res.Id_Cus].Username.toString();
        cell3.innerHTML =  res.Point.toString()+"đ";
    }
    if (count==10) break;
  }
 }
}
