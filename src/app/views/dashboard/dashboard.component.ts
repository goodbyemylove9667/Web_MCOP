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

  // lineChart1
  // public lineChart1Data: Array<any> = [
  //   {
  //     data: [65, 59, 84, 84, 51, 55, 40],
  //     label: 'Series A'
  //   }
  // ];
  // public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChart1Options: any = {
  //   tooltips: {
  //     enabled: false,
  //     custom: CustomTooltips
  //   },
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       gridLines: {
  //         color: 'transparent',
  //         zeroLineColor: 'transparent'
  //       },
  //       ticks: {
  //         fontSize: 2,
  //         fontColor: 'transparent',
  //       }

  //     }],
  //     yAxes: [{
  //       display: false,
  //       ticks: {
  //         display: false,
  //         min: 40 - 5,
  //         max: 84 + 5,
  //       }
  //     }],
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 1
  //     },
  //     point: {
  //       radius: 4,
  //       hitRadius: 10,
  //       hoverRadius: 4,
  //     },
  //   },
  //   legend: {
  //     display: false
  //   }
  // };
  // public lineChart1Colours: Array<any> = [
  //   {
  //     backgroundColor: getStyle('--primary'),
  //     borderColor: 'rgba(255,255,255,.55)'
  //   }
  // ];
  // public lineChart1Legend = false;
  // public lineChart1Type = 'line';

  // // lineChart2
  // public lineChart2Data: Array<any> = [
  //   {
  //     data: [1, 18, 9, 17, 34, 22, 11],
  //     label: 'Series A'
  //   }
  // ];
  // public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChart2Options: any = {
  //   tooltips: {
  //     enabled: false,
  //     custom: CustomTooltips
  //   },
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       gridLines: {
  //         color: 'transparent',
  //         zeroLineColor: 'transparent'
  //       },
  //       ticks: {
  //         fontSize: 2,
  //         fontColor: 'transparent',
  //       }

  //     }],
  //     yAxes: [{
  //       display: false,
  //       ticks: {
  //         display: false,
  //         min: 1 - 5,
  //         max: 34 + 5,
  //       }
  //     }],
  //   },
  //   elements: {
  //     line: {
  //       tension: 0.00001,
  //       borderWidth: 1
  //     },
  //     point: {
  //       radius: 4,
  //       hitRadius: 10,
  //       hoverRadius: 4,
  //     },
  //   },
  //   legend: {
  //     display: false
  //   }
  // };
  // public lineChart2Colours: Array<any> = [
  //   { // grey
  //     backgroundColor: getStyle('--info'),
  //     borderColor: 'rgba(255,255,255,.55)'
  //   }
  // ];
  // public lineChart2Legend = false;
  // public lineChart2Type = 'line';


  // // lineChart3
  // public lineChart3Data: Array<any> = [
  //   {
  //     data: [78, 81, 80, 45, 34, 12, 40],
  //     label: 'Series A'
  //   }
  // ];
  // public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChart3Options: any = {
  //   tooltips: {
  //     enabled: false,
  //     custom: CustomTooltips
  //   },
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       display: false
  //     }],
  //     yAxes: [{
  //       display: false
  //     }]
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 2
  //     },
  //     point: {
  //       radius: 0,
  //       hitRadius: 10,
  //       hoverRadius: 4,
  //     },
  //   },
  //   legend: {
  //     display: false
  //   }
  // };
  // public lineChart3Colours: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(255,255,255,.2)',
  //     borderColor: 'rgba(255,255,255,.55)',
  //   }
  // ];
  // public lineChart3Legend = false;
  // public lineChart3Type = 'line';


  // // barChart1
  // public barChart1Data: Array<any> = [
  //   {
  //     data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
  //     label: 'Series A'
  //   }
  // ];
  // public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  // public barChart1Options: any = {
  //   tooltips: {
  //     enabled: false,
  //     custom: CustomTooltips
  //   },
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       display: false,
  //       barPercentage: 0.6,
  //     }],
  //     yAxes: [{
  //       display: false
  //     }]
  //   },
  //   legend: {
  //     display: false
  //   }
  // };
  // public barChart1Colours: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(255,255,255,.3)',
  //     borderWidth: 0
  //   }
  // ];
  // public barChart1Legend = false;
  // public barChart1Type = 'bar';

  // // mainChart

  // public mainChartElements = 27;
  // public mainChartData1: Array<number> = [];
  // public mainChartData2: Array<number> = [];
  // public mainChartData3: Array<number> = [];

  // public mainChartData: Array<any> = [
  //   {
  //     data: this.mainChartData1,
  //     label: 'Current'
  //   },
  //   {
  //     data: this.mainChartData2,
  //     label: 'Previous'
  //   },
  //   {
  //     data: this.mainChartData3,
  //     label: 'BEP'
  //   }
  // ];
  // /* tslint:disable:max-line-length */
  // public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // /* tslint:enable:max-line-length */
  // public mainChartOptions: any = {
  //   tooltips: {
  //     enabled: false,
  //     custom: CustomTooltips,
  //     intersect: true,
  //     mode: 'index',
  //     position: 'nearest',
  //     callbacks: {
  //       labelColor: function(tooltipItem, chart) {
  //         return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
  //       }
  //     }
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       gridLines: {
  //         drawOnChartArea: false,
  //       },
  //       ticks: {
  //         callback: function(value: any) {
  //           return value.charAt(0);
  //         }
  //       }
  //     }],
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true,
  //         maxTicksLimit: 5,
  //         stepSize: Math.ceil(250 / 5),
  //         max: 250
  //       }
  //     }]
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 2
  //     },
  //     point: {
  //       radius: 0,
  //       hitRadius: 10,
  //       hoverRadius: 4,
  //       hoverBorderWidth: 3,
  //     }
  //   },
  //   legend: {
  //     display: false
  //   }
  // };
  // public mainChartColours: Array<any> = [
  //   { // brandInfo
  //     backgroundColor: hexToRgba(getStyle('--info'), 10),
  //     borderColor: getStyle('--info'),
  //     pointHoverBackgroundColor: '#fff'
  //   },
  //   { // brandSuccess
  //     backgroundColor: 'transparent',
  //     borderColor: getStyle('--success'),
  //     pointHoverBackgroundColor: '#fff'
  //   },
  //   { // brandDanger
  //     backgroundColor: 'transparent',
  //     borderColor: getStyle('--danger'),
  //     pointHoverBackgroundColor: '#fff',
  //     borderWidth: 1,
  //     borderDash: [8, 5]
  //   }
  // ];
  // public mainChartLegend = false;
  // public mainChartType = 'line';

  // // social box charts

  // public brandBoxChartData1: Array<any> = [
  //   {
  //     data: [65, 59, 84, 84, 51, 55, 40],
  //     label: 'Facebook'
  //   }
  // ];
  // public brandBoxChartData2: Array<any> = [
  //   {
  //     data: [1, 13, 9, 17, 34, 41, 38],
  //     label: 'Twitter'
  //   }
  // ];
  // public brandBoxChartData3: Array<any> = [
  //   {
  //     data: [78, 81, 80, 45, 34, 12, 40],
  //     label: 'LinkedIn'
  //   }
  // ];
  // public brandBoxChartData4: Array<any> = [
  //   {
  //     data: [35, 23, 56, 22, 97, 23, 64],
  //     label: 'Google+'
  //   }
  // ];

  // public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public brandBoxChartOptions: any = {
  //   tooltips: {
  //     enabled: false,
  //     custom: CustomTooltips
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       display: false,
  //     }],
  //     yAxes: [{
  //       display: false,
  //     }]
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 2
  //     },
  //     point: {
  //       radius: 0,
  //       hitRadius: 10,
  //       hoverRadius: 4,
  //       hoverBorderWidth: 3,
  //     }
  //   },
  //   legend: {
  //     display: false
  //   }
  // };
  // public brandBoxChartColours: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(255,255,255,.1)',
  //     borderColor: 'rgba(255,255,255,.55)',
  //     pointHoverBackgroundColor: '#fff'
  //   }
  // ];
  // public brandBoxChartLegend = false;
  // public brandBoxChartType = 'line';

  // public random(min: number, max: number) {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

 async ngOnInit() {

  //  await this.firebase.database.ref('Employee').once('value',(value)=>
  //   {
  //       if (value.exists)
  //       {
  //         this.emp_sl=value.numChildren();         
  //       }
  //       else
  //       {
  //         this.emp_sl=0;
  //       }
  //   });
  //   await this.firebase.database.ref('Customer').once('value',(value)=>
  //   {
  //       if (value.exists)
  //       {
  //         this.cus_sl=value.numChildren();         
  //       }
  //       else
  //       {
  //         this.cus_sl=0;
  //       }
  //   });
  //   await this.firebase.database.ref('Topic').once('value',(value)=>
  //   {
  //       if (value.exists)
  //       {
  //         this.top_sl=value.numChildren();     
  //         console.log(value);
  //         for (let key in value) {
  //           this.listTop.push
  //             ({
  //               Id: key,
  //               Name_Top: value[key].Name_Top,
  //               Image: value[key].Image,
  //               Status: value[key].Status
  //             }
  //             )
  //         }    
  //         console.log(this.listTop);
  //       }
  //       else
  //       {
  //         this.top_sl=0;
  //       }
  //   });
  //   await this.firebase.database.ref('Question').once('value',(value)=>
  //   {
  //       if (value.exists)
  //       {
  //         this.quest_sl=value.numChildren();         
  //       }
  //       else
  //       {
  //         this.quest_sl=0;
  //       }
  //   });
  //   await this.firebase.database.ref('Contest').once('value',(value)=>
  //   {
  //       if (value.exists)
  //       {
  //         this.con_sl=value.numChildren();         
  //       }
  //       else
  //       {
  //         this.con_sl=0;
  //       }
  //   });
  //   await this.firebase.database.ref('Include').once('value',(value)=>
  //   {
  //       if (value.exists)
  //       {
  //         this.inc_sl=value.numChildren();         
  //       }
  //       else
  //       {
  //         this.inc_sl=0;
  //       }
  //   });
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
