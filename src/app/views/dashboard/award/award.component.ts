import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TopicsService,Topic } from '../../../services/topics.service';
@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.scss']
})
export class AwardComponent implements OnInit {

  constructor(private toastr: ToastrService,private topservice:TopicsService) { }
  listTop: Array<Topic> = [];
  objTop: any;
  Id_Top: '';
  ngOnInit() {
    this.topservice.getList().then((res) => {
      for (let key in res) {
          this.listTop.push
            ({
              Id: key,
              Name_Top: res[key].Name_Top,
              Image: res[key].Image,
              Status: res[key].Status
            }
            )
        }
        this.objTop=res;
      }, error => {
        this.toastr.error( 'Không Tải Được Dữ Liệu Chủ Đề','Thông Báo!',{timeOut: 1000});
      });
  }

}
