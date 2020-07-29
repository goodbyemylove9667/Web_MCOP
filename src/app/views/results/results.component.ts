import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ResultsService, Result } from '../../services/results.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('delModal', { static: false }) public delModal: ModalDirective;
  @ViewChild('delAllModal', { static: false }) public delAlModal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('myInput', { static: false }) myInputVariable: ElementRef;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service: ResultsService, private toastr: ToastrService,private cusservices:CustomerService) {

  }
  list: Array<Result> = [];
  data: Result;
  dtOptions: any = {};
  image: any;
  slc_search: number = 3;
  inp_search: '';
  delkey: '';
  objCus: any;
  type: number = 1;
  ngOnInit(): void {
    this.cusservices.getList().then((res) => {
      this.objCus=res;
    });
    this.service.getList().then((res) => {
      for (let key in res) {
        this.list.push
          ({
            Id: key,
            Id_Cus: res[key].Id_Cus,
            Id_Con: res[key].Id_Con,
            Point: res[key].Point,
            TimeLeft_Res: res[key].TimeLeft_Res,
            Date_Res: res[key].Date_Res,
          }
          )
      }
      this.rerender();
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu', 'Thông Báo!', { timeOut: 2000 });
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      scrollCollapse: true,
      dom: 'lrtip',
      columnDefs: [{
        targets: 0,
        data: null,
        defaultContent: '',
        orderable: false,
        className: 'select-checkbox'
      }],
      select: {
        style: 'multi'
      },
      language:
      {
        select: {
          rows: "%d dòng được chọn"
      },
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
      const inp_search = this.accentsTidy(this.inp_search);
      if (inp.includes(inp_search) || inp_search == "undefined" || inp_search.trim() == "") {
        return true;
      }
      return false;
    });
    this.service.resetForm();
  }
  slcAll:boolean=true;
  selectAll()
  {

    this.dtElement.dtInstance.then((dtInstance: any) => {
      if (this.slcAll)
      {
        this.slcAll=false;
      dtInstance.rows({page:'current',search:'removed'}).select();
      }
      else
      {
        this.slcAll=true;
        dtInstance.rows({page:'current',search:'removed'}).deselect();
      }
    });
  }
 async deleteAll()
  { 
    this.blockUI.start('Loading...'); 
    var check=true;
    await this.dtElement.dtInstance.then((dtInstance: any) => {
       var data=dtInstance.rows( { selected: true } ).data()
        for (let element of data)
        {
          this.service.delete(element[2]).then(
            () => {
              if (!(this.service.msg.length == 0 || this.service.msg.length == "")) {
                check=false;
                this.toastr.error('Xóa Thất Bại' + ".Lỗi: " + this.service.msg, 'Thất Bại!', { timeOut: 2000 });
                this.delAlModal.hide();
                this.blockUI.stop();
                return;
              }
            }
          )
        }
      }).then(()=>
      {
        if (check)
        {
          this.refresh();
          this.toastr.success('Xóa Thành Công', 'Thành Công!', { timeOut: 2000 });
          this.delAlModal.hide();
          this.blockUI.stop();
        }
      }).catch(()=>
      {
        this.refresh();
        this.delAlModal.hide();
        this.blockUI.stop();
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
    r = r.replace(new RegExp(/[ưứừựữử]/g), "u");
    r = r.replace(new RegExp(/[uúùụũủ]/g), "u");
    r = r.replace(new RegExp(/[yýỳỹỷỵ]/g), "y");
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
        this.list.push
          ({
            Id: key,
            Id_Cus: res[key].Id_Cus,
            Id_Con: res[key].Id_Con,
            Point: res[key].Point,
            TimeLeft_Res: res[key].TimeLeft_Res,
            Date_Res: res[key].Date_Res,
          }
          )
      }

      this.rerender();
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu', 'Thông Báo!', { timeOut: 2000 });
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
      this.inp_search = "";
    });
  }
  showedit(data: Result) {
    this.service.showModal(data);
    this.myModal.show();
  }
  showdelete(delkey) {
    this.delkey = delkey;
    this.delModal.show();
  }
 async delete() {
    this.blockUI.start('Loading...'); 
    await this.service.delete(this.delkey).then(
      () => {
        if (this.service.msg.length == 0 || this.service.msg.length == "") {
          this.refresh();
          this.toastr.success('Xóa Thành Công', 'Thành Công!', { timeOut: 2000 });
          this.delModal.hide();
        }
        else {
          this.toastr.error('Xóa Thất Bại' + ".Lỗi: " + this.service.msg, 'Thất Bại!', { timeOut: 2000 });
          this.delModal.hide();
        }
      }
    );
    this.blockUI.stop();
  }
}
