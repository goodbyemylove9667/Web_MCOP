import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionsService, Question } from '../../services/questions.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TopicsService, Topic } from '../../services/topics.service';
import { EmployeeService, Employee } from '../../services/employee.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service: QuestionsService, private toastr: ToastrService, private topservice: TopicsService, private empservice: EmployeeService) {

  }
  list: Array<Question> = [];
  data: Question;
  listTop: Array<Topic> = [];
  objTop: any;
  listEmp: Array<Employee> = [];
  objEmp: any;
  dtOptions: DataTables.Settings = {};
  image: any;
  slc_search: number = 2;
  inp_search: '';
  type: number = 1;
  ngOnInit(): void {
    this.topservice.getList().then((res) => {
      for (let key in res) {
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
      this.objTop = {...res};
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu Chủ Đề', 'Thông Báo!', { timeOut: 1000 });
    });
    this.empservice.getList().then((res) => {
      this.objEmp = res;
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu Chủ Đề', 'Thông Báo!', { timeOut: 1000 });
    });
    this.service.getList().then((res) => {
      for (let key in res) {
        this.list.push
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
      this.rerender();
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu', 'Thông Báo!', { timeOut: 1000 });
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      scrollCollapse: true,
      dom: 'lrtip',
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
      const inp_search = this.accentsTidy(this.inp_search);
      if (inp.includes(inp_search) || inp_search == "undefined" || inp_search.trim() == "") {
        return true;
      }
      return false;
    });
    this.service.resetForm(1);
  
  }
  changeCon(s)
  {
    if (s.length>50)
    return s.substring(0,49)+"..."
    else return s;
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
      this.rerender();
    
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu', 'Thông Báo!', { timeOut: 1000 });
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
  showAdd() {
    this.type = 1;
    this.service.msg = "";
    this.service.showModal(null);
    this.myModal.show();
  }
  showedit(data: Question) {
    this.type = 2;
    this.service.msg = "";
    this.service.showModal(data);
    this.myModal.show();
  }
  onSubmit(form: NgForm) {
    if (this.type == 1) {
      console.log(form.value);
      this.service.insert(form).then(
        () => {
          if (this.service.msg.length == 0 || this.service.msg.length == "") {
            this.refresh();
            this.toastr.success('Thêm Thành Công Cuộc Thi', 'Thành Công!', { timeOut: 1000 });
            this.myModal.hide();
          }
          else {
            this.toastr.error('Thêm Thất Bại Cuộc Thi. Lỗi: ' + this.service.msg, 'Thất Bại!', { timeOut: 1000 });
          }
        }
      )
    }
    else {
      this.service.update(form).then(
        () => {
          if (this.service.msg.length == 0 || this.service.msg.length == "") {
            this.refresh();
            this.toastr.success('Cập Nhật Thành Công Chủ Đề' + form.value["Name_Top"], 'Thành Công!', { timeOut: 1000 });
            this.myModal.hide();
          }
          else {
            this.toastr.error('Cập Nhật Thất Bại Chủ Đề' + form.value["Name_Top"] + ".Lỗi: " + this.service.msg, 'Thất Bại!', { timeOut: 1000 });
          }
        }
      )
    }
  }

}
