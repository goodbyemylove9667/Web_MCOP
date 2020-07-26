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
  
  }

}
