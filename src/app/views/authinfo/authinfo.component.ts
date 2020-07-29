import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authinfo',
  templateUrl: './authinfo.component.html',
  styleUrls: ['./authinfo.component.scss']
})
export class AuthinfoComponent implements OnInit {

  key: string;
  user :any;
  loading=false;
  constructor(private firebase: AngularFireDatabase,private toastr: ToastrService,public router: Router) { }

 async ngOnInit() {
   this.loading=true;
  var email= await JSON.parse(localStorage.getItem("email"));
  this.user = {
    Id:'',
    Email: '',
    Password: 'abc123',
    Firstname : '',
    Lastname : '',
    Phone : '' ,
    Address : '',
    Birthday : new Date() ,
    Image : 'https://firebasestorage.googleapis.com/v0/b/adminiq-e827c.appspot.com/o/user-png-icon-male-user-icon-512.png?alt=media&token=883823b5-18fd-4d82-9a80-812c95839225',
    Group : 1 ,
    Status : 1
  };
   await this.firebase.database.ref('Employee').orderByChild("Email").equalTo(email).once("value",(value)=>
    {
        if (value.exists())
        {
          value.forEach((element)=>
          {
            this.key=element.key;
            this.user=element.toJSON();
           localStorage.setItem('currentUser', JSON.stringify(this.user));
            return;
          })
        }
    });
    this.loading=false;
  }
  Reset()
  {
    var data=JSON.parse(localStorage.getItem('currentUser'));
    this.user=data;
  }
  imageShow: any = '';
  onFileChanged(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imageShow = (<FileReader>event.target).result;
      this.user.Image = this.imageShow;
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
    if ( this.key!=null)
  this.firebase.database.ref('Employee/'+ this.key).update(
    {
      Firstname : form.value["Firstname"],
      Lastname : form.value["Lastname"],
      Phone : form.value["Phone"],
      Address :form.value["Address"],
      Birthday : form.value["Birthday"],
      Image : form.value["Image"],
   }
  ).then(async()=>
  {
   await localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.router.navigate(['']);
    this.toastr.success('Cập Nhật Tài Khoản Thành Công','Thành Công!',{timeOut: 1000});
  }
  ).
  catch((error)=>
  {
    this.toastr.error( 'Cập Nhật Tài Khoản Thất Bại','Thất Bại!',{timeOut: 1000});
  });
  }
}
