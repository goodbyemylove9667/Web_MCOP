import { Component, OnInit, ViewChild } from '@angular/core';
import { MenusService, Menu } from '../../services/menus.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Select2OptionData } from 'ng2-select2';
import { EmployeeService } from '../../services/employee.service';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $:any;
@Component({
  selector: 'app-questions',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('form', { static: false }) private form: NgForm;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service:MenusService,private empservice:EmployeeService,private toastr: ToastrService, public router: Router) {
  
  }
  list: Array<Menu> = [];
  listGroup: Array<Select2OptionData> = [
    { id:'0',text:'Quản trị'},
     { id:'1',text:'Nhân viên'}
  ];
  objCus:any={};
  data: Menu;
  options_group: Select2Options;
  value_group: string[]=[];
  dtOptions: DataTables.Settings = {};
  slc_search: number = 1;
  inp_search: '';
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
    await this.empservice.getCkList().then((res) => {
      this.objCus=res;
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu Tài Khoản Nhân Viên', 'Thông Báo!', { timeOut: 2000 });
    });
    await this.service.getList().then((res) => {
      for (let key in res) {
        this.list.push
          ({
            Id: key,
            Name: res[key].Name,
            Icon: res[key].Icon,
            Table: res[key].Table,
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
      this.list.sort((a,b)=>(a.Date_Create>b.Date_Create)?-1:(a.Date_Create<b.Date_Create)?1:0);
      this.rerender();
    }, error => {
      this.toastr.error('Không Tải Được Dữ Liệu', 'Thông Báo!', { timeOut: 2000 });
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
      if (this.slc_search==11)
      {
          if (rowData[this.slc_search].includes("true") && inp_search=="1") return true;
          if (rowData[this.slc_search].includes("false") && inp_search=="0") return true;
      }
      return false;
    });
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
        this.list.push
          ({
            Id: key,
            Name: res[key].Name,
            Icon: res[key].Icon,
            Table: res[key].Table,
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
      this.list.sort((a,b)=>(a.Date_Create>b.Date_Create)?-1:(a.Date_Create<b.Date_Create)?1:0);
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
  changed(data: {value: string[]}) {
    this.service.formData.Group = data.value.join(';');
  }
  changeUrl()
  {
    this.service.formData.Url='/'+this.service.formData.Table[0].toLocaleLowerCase()+this.service.formData.Table.substr(1);
  }
  changeStatus()
  {
    if (this.service.formData.Status) this.service.formData.Status=1;else this.service.formData.Status=0;
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
    return str.join(' + ');
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
    $('#iconpicker').iconpicker('reset');
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
    $('#iconpicker').iconpicker('reset');
    $('#iconpicker').iconpicker('setIcon',data.Icon);
    this.myModal.show();
  }
  resetForm()
  {
    $('#iconpicker').iconpicker('reset');
    if (this.type==1)
    {
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
      };
      $('#iconpicker').iconpicker('setIcon','fa-user');
    }
    else
    {
        this.service.msg = "";
        this.form.form.markAsPristine();
        this.service.showModal(this.service.data);
        this.value_group=this.service.data.Group.split(';');
        $('#select2_group select').select2(this.options_group).select2('val',this.value_group);
        $('#iconpicker').iconpicker('setIcon',this.service.data.Icon);
    }
  }
  onSubmit(form: NgForm) {
    this.blockUI.start('Loading...'); 
    form.value["Icon"]= $('#iconpicker_txt').val();
    if (this.type == 1) {
      this.service.insert(form).then(
        () => {
          if (this.service.msg.length == 0 || this.service.msg.length == "") {
            this.refresh();
            this.toastr.success('Thêm Thành Công Menu', 'Thành Công!', { timeOut: 2000 });
            this.myModal.hide();
            this.blockUI.stop();
          }
          else {
            this.toastr.error('Thêm Thất Bại Menu. Lỗi: ' + this.service.msg, 'Thất Bại!', { timeOut: 2000 });
            this.blockUI.stop();
          }
        }
      )
    }
    else {
      this.service.update(form).then(
        () => {
          if (this.service.msg.length == 0 || this.service.msg.length == "") {
            this.refresh();
            this.toastr.success('Cập Nhật Thành Công Menu ' + form.value["Name"], 'Thành Công!', { timeOut: 2000 });
            this.myModal.hide();
            this.blockUI.stop();
          }
          else {
            this.toastr.error('Cập Nhật Thất Bại Menu ' + form.value["Name"] + ".Lỗi: " + this.service.msg, 'Thất Bại!', { timeOut: 2000 });
            this.blockUI.stop();
          }
        }
      )
    }
  }

}
