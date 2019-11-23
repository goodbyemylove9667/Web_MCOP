import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CustomerService,Customer} from '../../services/customer.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent  implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false })dtElement: DataTableDirective;
  @ViewChild('myInput', { static: false }) myInputVariable: ElementRef;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service: CustomerService,private toastr: ToastrService) {

  }
  list: Array<Customer> = [];
  data: Customer;
  dtOptions: DataTables.Settings = {};
  image: any;
  slc_search : number = 2;
  inp_search: '';
  type: number = 1;
  ngOnInit(): void {
    this.service.getList().then((res) => {
    for (let key in res) {
        this.list.push
          ({
            Id: key,
            Username :res[key].Username, 
            Password: res[key].Password,
            Fullname: res[key].Fullname,
            Email: res[key].Email,
            Phone: res[key].Phone,
            Address: res[key].Address,
            Birthday: res[key].Birthday,
            Image: res[key].Image,
            Status: res[key].Status
          }
          )
      }
      this.rerender();
    }, error => {
      this.toastr.error( 'Không Tải Được Dữ Liệu','Thông Báo!',{timeOut: 1000});
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      scrollCollapse: true,
      dom : 'lrtip',
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
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const inp = this.accentsTidy(data[this.slc_search]); 
      const inp_search= this.accentsTidy(this.inp_search);
      if (inp.includes(inp_search) || inp_search=="undefined" ||  inp_search.trim()=="")
      {
        return true;
      }
      return false;
    });
    this.service.resetForm(1);
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
    r = r.replace(new RegExp(/[uúùụũủ]/g),"u");
    r = r.replace(new RegExp(/[yýỳỹỷỵ]/g),"y");
    return r;
};
compareDate(date)
{
 var date_now= new Date();
 var date0=new Date(date);
    if (date0>=date_now) return true
    else return false;
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
            Username :res[key].Username, 
            Password: res[key].Password,
            Fullname: res[key].Fullname,
            Email: res[key].Email,
            Phone: res[key].Phone,
            Address: res[key].Address,
            Birthday: res[key].Birthday,
            Image: res[key].Image,
            Status: res[key].Status
            }
            )
        }
  
        this.rerender();
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu','Thông Báo!',{timeOut: 1000});
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
  showAdd() {
    this.type = 1;
    this.service.msg = "";
    this.myInputVariable.nativeElement.value = "";
    this.service.showModal(null);
    this.myModal.show();
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
  showedit(data: Customer) {
    this.type = 2;
    this.service.msg = "";
    this.myInputVariable.nativeElement.value = "";
    this.service.showModal(data);
    this.myModal.show();
  }
  onSubmit(form: NgForm) {
    if (this.type == 1) {

      this.service.insert(form).then(
        ()=>
        {
          if (this.service.msg.length==0 || this.service.msg.length=="")
          {
          this.refresh();
          this.toastr.success('Thêm Thành Công Tài Khoản '+form.value["Username"],'Thành Công!',{timeOut: 1000});
          this.myModal.hide();
          }
          else
          {
            this.toastr.error( 'Thêm Thất Bại Tài Khoản'+form.value["Username"]+ ".Lỗi: "+this.service.msg,'Thất Bại!',{timeOut: 1000});
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
          this.toastr.success('Cập Nhật Thành Công Tài Khoản'+form.value["Username"],'Thành Công!',{timeOut: 1000});
          this.myModal.hide();
          }
          else
          {
            this.toastr.error( 'Cập Nhật Thất Bại Tài Khoản'+form.value["Username"]+ ".Lỗi: "+this.service.msg,'Thất Bại!',{timeOut: 1000});
          }
        }
      )
    }
  }

}
