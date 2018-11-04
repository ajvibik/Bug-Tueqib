import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IssueService } from '../../../core/services/issue.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  constructor(private issueService: IssueService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.params["id"];
    var data = this.issueService.get(id);

    console.log(data);
  }

}
