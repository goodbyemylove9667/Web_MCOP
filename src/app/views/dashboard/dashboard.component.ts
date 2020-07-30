import { Component, OnInit } from '@angular/core';
import { Result, ResultsService } from '../../services/results.service';
import { Topic, TopicsService } from '../../services/topics.service';
import { CustomerService } from '../../services/customer.service';
import { ContestsService } from '../../services/contests.service';
import { navItems } from '../../_nav';
import { MenusService } from '../../services/menus.service';
import { EmployeeService } from '../../services/employee.service';
import { Color } from 'ng2-charts';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-contests',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private cusservice: CustomerService,
    private topservice: TopicsService,private conservice: ContestsService,private menuservice: MenusService,private empservice: EmployeeService,private resservice:ResultsService) {
   }
  cus_sl:number=0;
  top_sl:number=0;
  con_sl:number=0;
  emp_sl:number=0;
  admin_sl:number=0;
  res_sl:number=0;
  listRes: Array<Result> = [];
  listDtt: Array<Result> = []
  listTop: Array<Topic> = [];
  award : Array<Object> =[];
  OjbCon: any={};
  OjbCus: any={};
  public doughnutChartLabels: string[] = ['Tài Khoản Người Dùng', 'Tài Khoản Nhân Viên', 'Tài Khoản Admin'];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartOptions: any = {
    legend: {
    	display: false
    },
    plugins: {
      datalabels: {
          formatter: (value, ctx) => {
          
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
                sum += data;
            });
            let percentage = (value*100 / sum).toFixed(2)+"%";
            return percentage;

        
          },
          color: '#fff',
               }
  }
  };
  public doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        '#ff6384',
        '#ffce56',
        '#36a2eb'
      ]
    }
  ];
  
  public lineChartData: Array<any> = [
    {data: [0,0,0,0,0,0,0]}
  ];
  public lineChartLabels: Array<any> = ['CN','T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  public lineChartOptions: any = {
    legend: {
    	display: false
    },
    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
            if (tooltipItem.value.length>0) {
              return tooltipItem.label+' có '+tooltipItem.value+' lượt thi';
            }
            else
            return 'Không có lượt thi trong ngày '+tooltipItem.label;
        }
    },
    }, 
    hover: {
        animationDuration: 0
    },
    animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];                            
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
   },
    responsive: TransitiveCompileNgModuleMetadata,
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBorderWidth:5,
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill:false
    }
  ];
   getWeekNumber(thisDate) {
    var date = new Date(thisDate);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);   
  }
 async ngOnInit() {
  await  this.cusservice.getList().then((value)=>
  {
    this.cus_sl=Object.getOwnPropertyNames(value).length; 
    this.OjbCus=value;
    this.doughnutChartData.push(this.cus_sl);
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
      if (key!='-MDBLQgsR3ZDZTyrrf8_')
      {
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
    }
  }); 
  await this.empservice.getList().then((value)=>
  {
    for (let key in value) {
        if (value[key].Group=='0')
        {
            this.admin_sl++;
        }
        else
        if (value[key].Group=='1')
        {
          this.emp_sl++;
        }
    }
    this.doughnutChartData.push(this.emp_sl);
    this.doughnutChartData.push(this.admin_sl);
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.type=="doughnut")
        {
          var width = chart.width,
              height = chart.height,
              ctx = chart.ctx;
          ctx.restore();
          var arr=[];
          arr=chart.data.datasets[0]["data"];
          var text=arr.reduce((a, b) => a + b, 0);
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          var    textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
  });
  });
  await  this.resservice.getorderList().then((value)=>
  {
    this.res_sl=Object.getOwnPropertyNames(value).length; 
    var arr={data: [0,0,0,0,0,0,0],fill:false};
    value.forEach((data)=>
    {
      if (data.key!='-MDSV6A4mCgLzdFeyUPf')
      {
        this.listRes.push({
          Id: data.key,
          Id_Cus: data.toJSON().Id_Cus,
          Id_Con:  data.toJSON().Id_Con,
          Point :  data.toJSON().Point,
          TimeLeft_Res :  data.toJSON().TimeLeft_Res,
          Date_Res:  data.toJSON().Date_Res 
        });
        var date= new Date(data.toJSON().Date_Res);
        var now=new Date();
        if (this.getWeekNumber(now)==this.getWeekNumber(date) && now.getFullYear()==date.getFullYear())
        {      
          arr["data"][date.getDay()]++;
        }
      }
      else
      {
        this.listDtt.push({
          Id: data.key,
          Id_Cus: data.toJSON().Id_Cus,
          Id_Con:  data.toJSON().Id_Con,
          Point :  data.toJSON().Point,
          TimeLeft_Res :  data.toJSON().TimeLeft_Res,
          Date_Res:  data.toJSON().Date_Res 
        });
      }
    });
    this.lineChartData.length=0;
    this.lineChartData.push(arr);
    this.lineChartColours=[...this.lineChartColours];
    this.listRes.sort((a, b)=> Number ( b.Point-a.Point || (b.Point==a.Point && a.TimeLeft_Res>b.TimeLeft_Res)));
    this.listDtt.sort((a, b)=> Number ( b.Point-a.Point || (b.Point==a.Point && a.TimeLeft_Res>b.TimeLeft_Res)));
    this.createTb('tb_db',this.listRes,dfkey);
    this.createTb('tb_dtt',this.listDtt,'');
  });
  var db_menu = document.getElementById("db_menu");
  var str=db_menu.attributes[0].nodeName;
  navItems.forEach(async(element)=>
  {
    if (element.table=='Customer')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-12 col-sm-3 text-decoration-none" >
      <div `+str+` class="card text-white" style="background-color:`+element.color+`;height:120px;">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="fa `+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ this.cus_sl+`</div>
        </div>
      </div>
    </a>`
    }
    else
    if (element.table=='Employee')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-12 col-sm-3 text-decoration-none" >
      <div `+str+` class="card text-white" style="background-color:`+element.color+`;height:120px;">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="fa `+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+(this.emp_sl+this.admin_sl)+`</div>
        </div>
      </div>
    </a>`
    }
    else
    if (element.table=='Contest')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-12 col-sm-3 text-decoration-none" >
      <div `+str+` class="card text-white" style="background-color:`+element.color+`;height:120px;">
        <div `+str+` class="card-body">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="fa `+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ this.con_sl+`</div>
        </div>
      </div>
    </a>`
    }
    else
    if (element.table=='Topic')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-12 col-sm-3 text-decoration-none" >
      <div `+str+` class="card text-white" style="background-color:`+element.color+`;height:120px;">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="fa `+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ this.top_sl+`</div>
        </div>
      </div>
    </a>`
    }
    else
    if (element.table=='Result')
    {
      db_menu.innerHTML+=`<a `+str+` class="col-12 col-sm-3 text-decoration-none" >
      <div `+str+` class="card text-white" style="background-color:`+element.color+`;height:120px;">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="fa `+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+(this.listRes.length+this.listDtt.length)+`</div>
        </div>
      </div>
    </a>`
    }
   else
   if (element.table!=null && element.table!='')
   {
     var sl=0;
     var stt=true;
     if (element.table=="Include" || element.table=="Result") stt=false;
     await this.menuservice.getCkList_Count(element.table,stt).then((value)=>
     {
       sl=value;
     }).catch(()=>{sl=0});
     db_menu.innerHTML+=`<a `+str+` class="col-12 col-sm-3 text-decoration-none" >
      <div `+str+` class="card text-white" style="background-color:`+element.color+`;height:120px;">
        <div `+str+` class="card-body py-4">
          <div `+str+` class="btn-group float-right">
            <i `+str+` class="fa `+element.icon+` fa-3x"></i>
          </div>
          <div `+str+` class="text-value">`+element.name+`</div>
          <div `+str+` style="opacity:0.8;">`+ sl+`</div>
        </div>
      </div>
    </a>`
   }
  });
 }
 createTb(tbName,data,dfkey)
 {
  var count=0;
  var table = <HTMLTableElement>document.getElementById(tbName);
    for (var res of data)
    {
      if ((dfkey.length==0 || this.OjbCon[res.Id_Con].Id_Top==dfkey) && this.OjbCus.hasOwnProperty(res.Id_Cus))
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
 change()
 {
  var x = (<HTMLInputElement>document.getElementById("slc_db")).value;
  var table = <HTMLTableElement>document.getElementById("tb_db");
  this.createTb(table,this.listRes,x);
 }
}
