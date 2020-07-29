import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatepickerOptions } from 'ngx-dates-picker';
declare var $:any;
@Component({
  selector: 'app-authinfo',
  templateUrl: './authinfo.component.html',
  styleUrls: ['./authinfo.component.scss']
})
export class AuthinfoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  key: string;
  user_info :any;
  loading=false;
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
  constructor(private firebase: AngularFireDatabase,private toastr: ToastrService,public router: Router) { 
  }

 async ngOnInit() {
   this.loading=true;
   this.user_info = await JSON.parse(localStorage.getItem('currentUser'));
   await this.firebase.database.ref('Employee').orderByChild("Email").equalTo(this.user_info.Email).limitToFirst(1).once("value",(value)=>
    {
        if (value.exists())
        {
          value.forEach((element)=>
          {
            this.key=element.key;
            this.user_info=element.toJSON();
           localStorage.setItem('currentUser', JSON.stringify(this.user_info));
          })
        }
    });
    $(function() {
      $('.ngx-dates-picker-input').prop('readonly', false);
  }); 

    this.loading=false;
  }
  async Reset(form:NgForm)
  {
    this.loading=true;
    form.form.markAsPristine();
    await this.firebase.database.ref('Employee').orderByChild("Email").equalTo(this.user_info.Email).limitToFirst(1).once("value",(value)=>
    {
        if (value.exists())
        {
          value.forEach((element)=>
          {
            this.key=element.key;
            this.user_info=element.toJSON();
           localStorage.setItem('currentUser', JSON.stringify(this.user_info));
          })
        }
    });
    this.loading=false;
  }
  imageShow: any = '';
  onFileChanged(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imageShow = (<FileReader>event.target).result;
      this.user_info.Image = this.imageShow;
    }
  }
  compareDate(date)
{
 var date_now= new Date();
 var date0=new Date(date);
    if (date0>=date_now) return true
    else return false;
}
  Update(form :NgForm)
  {
    this.blockUI.start('Loading...'); 
    console.log(form.value);
    if ( this.key!=null)
    {
      var date=new Date();
      var y=date.getFullYear();
      var m=date.getMonth()+1;
      var d=date.getDate();
      var hour=date.getHours();
      var min=date.getMinutes();
      var sec=date.getSeconds();
      var dt=y+'/'+(m>9?m:('0'+m))+'/'+(d>9?d:('0'+d))+' '+(hour>9?hour:('0'+hour))+':'+(min>9?min:('0'+min))+':'+(sec>9?sec:('0'+sec));
  this.firebase.database.ref('Employee/'+ this.key).update(
    {
      Firstname : form.value["Firstname"],
      Lastname : form.value["Lastname"],
      Phone : form.value["Phone"],
      Address :form.value["Address"],
      Birthday : form.value["Birthday"],
      Image : form.value["Image"],
      Employee_Edit: this.key,     
      Date_Edit: dt,
   }
  ).then(async()=>
  {
    form.form.markAsPristine();
    this.toastr.success('Cập Nhật Tài Khoản Thành Công','Thành Công!',{timeOut: 2000});
    this.blockUI.stop();
  }
  ).
  catch((error)=>
  {
    form.form.markAsPristine();
    this.toastr.error( 'Cập Nhật Tài Khoản Thất Bại','Thất Bại!',{timeOut: 2000});
    this.blockUI.stop();
  });
  }
}
}
