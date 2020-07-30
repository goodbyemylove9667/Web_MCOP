import { Component, OnInit, ViewChild } from '@angular/core';
import { ContestsService, Contest } from '../../services/contests.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TopicsService,Topic } from '../../services/topics.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('form', { static: false }) private form: NgForm;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false })dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service: ContestsService,private toastr: ToastrService,private empservice:EmployeeService,private topservice:TopicsService, public router: Router) {
    var index=navItems.findIndex(x=>x.table=='Contest');
    if (index==-1)
    {
      this.router.navigate(['']);
    }
  }
  list: Array<Contest> = [];
  data: Contest;
  listTop: Array<Topic> = [];
  objTop: any;
  objCus: any;
  dtOptions: DataTables.Settings = {};
  image: any;
  slc_search : number = 1;
  inp_search: '';
  type: number = 1;
  async initTable() {
   await this.topservice.getCkList().then((res) => {
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
      await this.empservice.getCkList().then((res) => {
        this.objCus=res;
      }, error => {
        this.toastr.error('Không Tải Được Dữ Liệu Tài Khoản Nhân Viên', 'Thông Báo!', { timeOut: 2000 });
      });
      await this.service.getList().then((res) => {
    for (let key in res) {
      if (key!='-MDSV6A4mCgLzdFeyUPf')
        this.list.push
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
      this.list.sort((a,b)=>(a.Date_Create>b.Date_Create)?-1:(a.Date_Create<b.Date_Create)?1:0);
      this.rerender();
    }, error => {
      this.toastr.error( 'Không Tải Được Dữ Liệu','Thông Báo!',{timeOut: 2000});
    });

   }
   ngOnInit(): void {
     this.service.resetForm(1);
     this.dtOptions = {
       pagingType: 'full_numbers',
       responsive: true,
       scrollCollapse: true,
       dom: 'lrtip',
       autoWidth:false,
       scrollX:true,
       language:
       {
         emptyTable: '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>',
         lengthMenu: "Hiển thị _MENU_ trường trên một trang",
         zeroRecords: "Không tìm thấy dữ liệu",
         info: "Hiển thị trang _PAGE_ trong _PAGES_ trang",
         infoEmpty: "Không có trường hợp lệ",
         infoFiltered: "(Lọc từ _MAX_ trên tổng số trường)",
 
         paginate: {
           first: '<i class="fa fa-angle-double-left "></i>',
           last: '<i class="fa fa-angle-double-right "></i>',
           next: '<i class="fa fa-angle-right "></i>',
           previous: '<i class="fa fa-angle-left "></i>'
         }
       }
     };
     this.initTable();
     $.fn['dataTable'].ext.search.push((settings, data, dataIndex,rowData) => {
      const inp = this.accentsTidy(data[this.slc_search]).trim();
      const inp_search = this.accentsTidy(this.inp_search).trim();
      if (inp.includes(inp_search) || inp_search == "undefined" || inp_search == "") {
        return true;
      }
      if (this.slc_search==9)
      {
          if (rowData[this.slc_search].includes("true") && inp_search=="1") return true;
          if (rowData[this.slc_search].includes("false") && inp_search=="0") return true;
      }
      return false;
    });
   }

  checkPoint(point)
  {
      if (point >=0 && point <=1000) return false
      else true;
  }
  resizeText(s:string)
  {
      if (s.length>30) return s.substr(0,27)+"..."; else return s;
  }
  accentsTidy (s){
    var r=s+"";
    r=r.toLowerCase();
    r = r.replace(new RegExp(/[aăâàằầáắấãẵẫảẳẩạặậ]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[eêèềéếẽễẻểẹệ]/g),"e");
    r = r.replace(new RegExp(/[iíìịĩỉ]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");                
    r = r.replace(new RegExp(/[oôòồóốõỗỏổọộ]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[uúùụũủưứừựữử]/g),"u");
    r = r.replace(new RegExp(/[yýỳỹỷỵ]/g),"y");
    return r;
};
  ngAfterViewInit(): void {

    this.dtTrigger.next();
  }
  refresh() {
    this.list = [];
    this.rerender();
    this.service.getList().then((res) => {
      for (let key in res) {
        if (key!='-MDSV6A4mCgLzdFeyUPf')
          this.list.push
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
        this.list.sort((a,b)=>(a.Date_Create>b.Date_Create)?-1:(a.Date_Create<b.Date_Create)?1:0);
        this.rerender();
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu','Thông Báo!',{timeOut: 2000});
      });
  }
  getDate(date_str) {
    if (date_str!=null && date_str!='')
    {
      var date=new Date(date_str);
      var y=date.getFullYear();
      var m=date.getMonth()+1;
      var d=date.getDate();
      var hour=date.getHours();
      var min=date.getMinutes();
      var sec=date.getSeconds();
      var dt=(d>9?d:('0'+d))+'/'+(m>9?m:('0'+m))+'/'+y+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
      return dt;
    }
    else return '';
  }
  getObj_Name(obj,key,attr)
  {
    var x='';
    try
    {
      x=obj[key][attr];
    }
    catch{};
    return x;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  filter(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
      this.inp_search="";
    });
  }
  showAdd() {
    this.type = 1;
    this.service.msg = "";
    this.form.form.markAsPristine();
    this.service.showModal(null);
    this.myModal.show();
  }
  showedit(data: Contest) {
    this.type = 2;
    this.service.msg = "";
    this.form.form.markAsPristine();
    this.service.showModal(data);
    this.myModal.show();
  }
  resetForm()
  {
    this.form.form.markAsPristine();
    if (this.type==1)
    {
        this.service.msg = "";
        this.form.form.markAsPristine();
      this.service.showModal(null);    
    }
    else
    {
        this.service.msg = "";
        this.form.form.markAsPristine();
        this.service.showModal(this.service.data);
    }
  }
  onSubmit(form: NgForm) {
    this.blockUI.start('Loading...'); 
    if (this.type == 1) {
      this.service.insert(form).then(
        ()=>
        {
          if (this.service.msg.length==0 || this.service.msg.length=="")
          {
          this.refresh();
          this.toastr.success('Thêm Thành Công Cuộc Thi','Thành Công!',{timeOut: 2000});
          this.myModal.hide();
          this.blockUI.stop();
          }
          else
          {
            this.toastr.error( 'Thêm Thất Bại Cuộc Thi. Lỗi: '+this.service.msg,'Thất Bại!',{timeOut: 2000});
            this.blockUI.stop();
          }
        }
      )
    }
    else {
      this.service.update(form).then(
        ()=>
        { 
          if (this.service.msg.length==0 || this.service.msg.length=="")
          {
          this.refresh();
          this.toastr.success('Cập Nhật Thành Công Cuộc Thi','Thành Công!',{timeOut: 2000});
          this.myModal.hide();
          this.blockUI.stop();
          }
          else
          {
            this.toastr.error( 'Cập Nhật Thất Bại Cuộc Thi'+ ".Lỗi: "+this.service.msg,'Thất Bại!',{timeOut: 2000});
            this.blockUI.stop();
          }
        }
      )
    }
  }

}
