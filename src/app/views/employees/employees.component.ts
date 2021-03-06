import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit ,ElementRef} from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import { DatepickerOptions } from 'ngx-dates-picker';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $:any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit, OnDestroy, OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('form', { static: false }) private form: NgForm;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false })dtElement: DataTableDirective;
  @ViewChild('myInput', { static: false }) myInputVariable: ElementRef;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service: EmployeeService,private toastr: ToastrService, public router: Router,private http:HttpClient) {
  var index=navItems.findIndex(x=>x.table=='Employee');
    if (index==-1)
    {
      this.router.navigate(['']);
    }
  }
  list: Array<Employee> = [];
  data: Employee;
  dtOptions: DataTables.Settings = {};
  objCus:any;
  image: any;
  slc_search : number = 1;
  inp_search: '';
  type: number = 1;
  user: any;
  options: DatepickerOptions = {
    selectRange: false,
    displayFormat: 'DD-MM-YYYY',
    barTitleFormat: 'MM/YYYY',
    barTitleIfEmpty: '',
    placeholder: '', 
    addClass: 'form-control',
    fieldId:'birthday',
    addStyle: {width:'100%'}
  };
  async initTable()
  {
   await this.service.getList().then((res) => {
      for (let key in res) {
          this.list.push
            ({
              Id: key,
              Email: res[key].Email,
              Password: res[key].Password,
              Firstname: res[key].Firstname,
              Lastname: res[key].Lastname,
              Phone: res[key].Phone,
              Address: res[key].Address,
              Birthday: res[key].Birthday,
              Image: res[key].Image,
              Group: res[key].Group,  
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
        this.objCus=res;
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
      if (this.slc_search==13)
      {
          if (rowData[this.slc_search].includes("true") && inp_search=="1") return true;
          if (rowData[this.slc_search].includes("false") && inp_search=="0") return true;
      }
      return false;
    });
    $(function() {
      $('.ngx-dates-picker-input').prop('readonly', false);
  }); 
  }
  accentsTidy(s) {
    var r = s + "";
    r = r.toLowerCase();
    r = r.replace(new RegExp(/[aăâàằầáắấãẵẫảẳẩạặậ]/g), "a");
    r = r.replace(new RegExp(/æ/g), "ae");
    r = r.replace(new RegExp(/ç/g), "c");
    r = r.replace(new RegExp(/[eêèềéếẽễẻểẹệ]/g), "e");
    r = r.replace(new RegExp(/[iíìịĩỉ]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[oôòồóốõỗỏổọộ]/g), "o");
    r = r.replace(new RegExp(/œ/g), "oe");
    r = r.replace(new RegExp(/[uúùụũủưứừựữử]/g), "u");
    r = r.replace(new RegExp(/[yýỳỹỷỵ]/g), "y");
    return r;
  };
compareDate(date)
{
 var date_now= new Date();
 var date0=new Date(date);
    if (date0>=date_now) return true
    else return false;
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
  ngAfterViewInit(): void {

    this.dtTrigger.next();
  }
  refresh() {
    this.list = [];
    this.rerender();
    this.service.getList().then((res) => {
      for (let key in res) {
          this.list.push
            ({
              Id: key,
              Email: res[key].Email,
              Password: res[key].Password,
              Firstname: res[key].Firstname,
              Lastname: res[key].Lastname,
              Phone: res[key].Phone,
              Address: res[key].Address,
              Birthday: res[key].Birthday,
              Image: res[key].Image,
              Group: res[key].Group,  
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
        this.objCus=res;
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu','Thông Báo!',{timeOut: 2000});
      });
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
  imageShow: any = '';
  onFileChanged(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imageShow = (<FileReader>event.target).result;
      this.service.formData.Image = this.imageShow;
    }
  }
  showAdd() {
    this.type = 1;
    this.service.msg = "";
    this.myInputVariable.nativeElement.value = "";
    this.form.form.markAsPristine();
    this.service.showModal(null);
    this.myModal.show();
  }
  showedit(data: Employee) {
    this.type = 2;
    this.service.msg = "";
    this.myInputVariable.nativeElement.value = "";
    this.form.form.markAsPristine();
    this.service.showModal(data);
    this.myModal.show();
  }
  resetForm()
  {
    if (this.type==1)
    {
        this.service.msg = "";
      this.form.form.markAsPristine();
      this.service.showModal(null);    }
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
      var params={
        "email":form.value["Email"],
        "password":form.value["Password"],
        "returnSecureToken":false
      }
      const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
     this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFtaA4Z_9xNwPqTf_0iETw7bTlWJktiY0",
        params,httpOptions
      )
      .subscribe((data) => 
      {
        this.service.insert(form).then(
          ()=>
          {
            if (this.service.msg.length==0 || this.service.msg.length=="")
            {
            this.refresh();
            this.toastr.success('Thêm Thành Công Tài Khoản '+form.value["Email"],'Thành Công!',{timeOut: 2000});
            this.myModal.hide();
            this.blockUI.stop();
            }
            else
            {
              this.toastr.error( 'Thêm Thất Bại Tài Khoản '+form.value["Email"]+ ".Lỗi: "+this.service.msg,'Thất Bại!',{timeOut: 2000});
              this.blockUI.stop();
            }
          }
        )
      },
       error => 
       {
             this.toastr.error( 'Thêm Thất Bại Tài Khoản '+form.value["Email"]+ ".Lỗi: Không thể thêm",'Thất Bại!',{timeOut: 2000});
            this.blockUI.stop();
        }
      );
    }
    else {
      this.service.update(form).then(
        ()=>
        { 
          if (this.service.msg.length==0 || this.service.msg.length=="")
          {
            this.refresh();
            this.toastr.success('Cập Nhật Thành Công Tài Khoản '+form.value["Email"],'Thành Công!',{timeOut: 2000});
            this.myModal.hide();
            this.blockUI.stop();
          }
          else
          {
            this.toastr.error( 'Cập Nhật Thất Bại Tài Khoản '+form.value["Email"]+ ".Lỗi: "+this.service.msg,'Thất Bại!',{timeOut: 2000});
            this.blockUI.stop();
          }
        }
      )
    }
  }
}
