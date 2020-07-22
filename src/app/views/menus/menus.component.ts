import { Component, OnInit, ViewChild } from '@angular/core';
import { MenusService, Menu } from '../../services/menus.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GroupsService, Group } from '../../services/groups.service';
import { Select2OptionData } from 'ng2-select2';
declare var $:any;
@Component({
  selector: 'app-questions',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('form', { static: false }) public form: NgForm;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service:MenusService,private groupservice:GroupsService, private toastr: ToastrService) {
    this.blockUI.start('Loading...'); 
  }
  list: Array<Menu> = [];
  listGroup: Array<Select2OptionData> = [];
  objGroup:any;
  data: Menu;
  options_group: Select2Options;
  value_group: string[]=[];
  dtOptions: DataTables.Settings = {};
  slc_search: number = 1;
  inp_search: '';
  loading:boolean=false;
  type: number = 1;
  async initTable() {
    this.options_group={
      placeholder: "Chọn Nhóm Quyền",
      width:'100%',
      language: {
        "noResults": function(){
            return "Không tìm thấy";
        },
        allowClear: true
    },
      multiple:true,
      allowClear:true
    }
    this.loading=false;
   await this.groupservice.getList().then((res) => {
      for (let key in res) {
        this.listGroup.push
          ({
            id: key,
            text: res[key].Name,
          }
          )
      }
      this.objGroup = {...res};
      this.loading=true;
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu Nhóm Quyền', 'Thông Báo!', { timeOut: 1000 });
    });
    await this.service.getList().then((res) => {
      for (let key in res) {
        this.list.push
          ({
            Id: key,
            Name: res[key].Name,
            Icon: res[key].Icon,
            Url: res[key].Url,
            Group:res[key].Group,
            Color:res[key].Color,
            Employee_Create:res[key].Employee_Create,
            Date_Create:res[key].Date_Create,
            Employee_Edit:res[key].Employee_Edit,
            Date_Edit:res[key].Date_Edit,
            Status : res[key].Status
          }
          )
      }
      this.rerender();
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu', 'Thông Báo!', { timeOut: 1000 });
    });

    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const inp = this.accentsTidy(data[this.slc_search]);
      const inp_search = this.accentsTidy(this.inp_search);
      if (inp.includes(inp_search) || inp_search == "undefined" || inp_search.trim() == "") {
        return true;
      }
      return false;
    });
    this.blockUI.stop();
  }
   ngOnInit(): void {  
    this.service.resetForm(1);
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
    $.fn.dataTable.ext.classes.sLengthSelect = 'custom-select w-auto d-inline-block';
    $.fn.dataTable.ext.classes.sPageButtonActive = 'btn btn-outline-secondary';
    this.initTable();
    $(function() {
          $('#iconpicker').iconpicker({
            align: 'center', 
            arrowClass: 'btn-primary',
            arrowPrevIconClass: 'fa fa-angle-left text-light',
            arrowNextIconClass: 'fa fa-angle-right text-light',
            cols: 10,
            footer: true,
            header: true,
            icon: 'fa-fas fa-user',
            iconset: 'fontawesome4',
            iconsetVersion: '4.7.0',
            labelHeader: '{0} của {1} trang',
            labelFooter: '{0} - {1} của {2} các icon',
            placement: 'bottom', 
            rows: 5,
            search: true,
            searchText: 'Tìm Kiém',
            selectedClass: 'btn-success',
            unselectedClass: ''
           });
        $('#iconpicker').on('change', function(e) {
          $('#iconpicker_txt').val(e.icon);
        });
    });   
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
            Name: res[key].Name,
            Icon: res[key].Icon,
            Url: res[key].Url,
            Group:res[key].Group,
            Color:res[key].Color,
            Employee_Create:res[key].Employee_Create,
            Date_Create:res[key].Date_Create,
            Employee_Edit:res[key].Employee_Edit,
            Date_Edit:res[key].Date_Edit,
            Status : res[key].Status
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
  changed(data: {value: string[]}) {
    this.service.formData.Group = data.value.join(';');
  }
  getName(group) {
    var gr=group.split(";");
    var str=[];
    for (let i=0;i<gr.length;i++)
    {
     var ele=this.listGroup.find(x=>x.id==gr[i]);
     if (ele!=null)
     {
       str.push(ele.text);
     }
    }
    return str.join(';');
  }
  showAdd() {
    this.type = 1;
    this.service.msg = "";
    this.form.form.markAsPristine();
    this.service.showModal(null);
    if (this.listGroup.length>0)
    {
      $('#select2_group select').select2(this.options_group).select2('val',[this.listGroup[this.listGroup.length-1].id])
       this.service.formData.Group=this.listGroup[this.listGroup.length-1].id;
    }
    else
    {
      $('#select2_group select').select2(this.options_group).select2('val',[]);
      this.service.formData.Group='';
    }
    $('#iconpicker').iconpicker('setIcon','fa-user');
    this.myModal.show();
  }
  showedit(data: Menu) {
    this.type = 2;
    this.service.msg = "";
    this.form.form.markAsPristine();
    this.service.showModal(data);
    this.value_group=data.Group.split(';');
    $('#select2_group select').select2(this.options_group).select2('val',this.value_group);
    $('#iconpicker').iconpicker('setIcon',data.Icon);
    this.myModal.show();
  }
  onSubmit(form: NgForm) {
    form.value["Icon"]= $('#iconpicker_txt').val();
    if (this.type == 1) {
      this.service.insert(form).then(
        () => {
          if (this.service.msg.length == 0 || this.service.msg.length == "") {
            this.refresh();
            this.toastr.success('Thêm Thành Công Menu', 'Thành Công!', { timeOut: 1000 });
            this.myModal.hide();
          }
          else {
            this.toastr.error('Thêm Thất Bại Menu. Lỗi: ' + this.service.msg, 'Thất Bại!', { timeOut: 1000 });
          }
        }
      )
    }
    else {
      this.service.update(form).then(
        () => {
          if (this.service.msg.length == 0 || this.service.msg.length == "") {
            this.refresh();
            this.toastr.success('Cập Nhật Thành Công Menu' + form.value["Name"], 'Thành Công!', { timeOut: 1000 });
            this.myModal.hide();
          }
          else {
            this.toastr.error('Cập Nhật Thất Bại Menu' + form.value["Name"] + ".Lỗi: " + this.service.msg, 'Thất Bại!', { timeOut: 1000 });
          }
        }
      )
    }
  }

}
