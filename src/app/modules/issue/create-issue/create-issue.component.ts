import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../core/services/issue.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  constructor(private issueService: IssueService, private tostr: ToastrService) { }
  rows = [];
  showSuccessMsg: boolean;
  formControls = this.issueService.form.controls;

  projects = [
    { id: '1', name: 'Asus' },
    { id: '2', name: 'Dell' },
    { id: '3', name: 'acer' }
  ];


  assignedTo = [
    { id: '2', name: 'Thowsif' },
    { id: '3', name: 'salman' },
    { id: '3', name: 'salam' },
    { id: '3', name: 'Alex' },
    { id: '1', name: 'Joseph Vibik' },
    { id: '3', name: 'Masthan' },
    { id: '3', name: 'Aathif' },
    { id: '3', name: 'Deepthi' }
  ];

  reporter = [
    { id: '1', name: 'salam' },
    { id: '2', name: 'Burham' },
    { id: '3', name: 'alex' }
  ];

  status = [
    { id: '1', name: 'New' },
    { id: '2', name: 'In Progress' },
    { id: '3', name: 'Completed' },
    { id: '3', name: 'On Hold' }
  ];

  severity = [
    { id: '1', name: 'Critical' },
    { id: '2', name: 'Major' },
    { id: '3', name: 'Moderate' },
    { id: '3', name: 'Minor' }
  ];

  priority = [
    { id: '2', name: 'Showstopper' },
    { id: '1', name: 'Critical' },
    { id: '3', name: 'Medium' },
    { id: '3', name: 'Low' }
  ];

  ngOnInit() {
    this.issueService.getAll();
  }

  //add issue

  addIssue() {
    if (this.issueService.form.valid) {
      if (this.issueService.form.get('$key').value == null) {
        var issue = this.issueService.form.get('project').value;
        var date = moment();
        var issueIdtemp = issue.name + '' + this.rows.length + 1;
        var createdDate = date.toLocaleString();
        var UpdatedDate = date.toLocaleString();

        this.issueService.form.get('issueId').setValue(issueIdtemp);
        this.issueService.form.get('createdBy').setValue(createdDate);
        this.issueService.form.get('updatedBy').setValue(UpdatedDate);

        this.issueService.add(this.issueService.form.value);
        this.tostr.success('Submitted Succcessfully', 'Issue Added');
      }
      else {
        var date1 = moment();
        var UpdatedDate1 = date1.toLocaleString();

        var data1 = {
          $key: this.issueService.form.get('$key').value,
          issueId: this.issueService.form.get('issueId').value,
          project: this.issueService.form.get('project').value,
          summary: this.issueService.form.get('summary').value,
          assigned: this.issueService.form.get('assigned').value,
          reporter: this.issueService.form.get('reporter').value,
          assertId: this.issueService.form.get('assertId').value,
          assertName: this.issueService.form.get('assertName').value,
          status: this.issueService.form.get('status').value,
          severity: this.issueService.form.get('severity').value,
          priority: this.issueService.form.get('priority').value,
          createdBy: this.issueService.form.get('createdBy').value,
          updatedBy: UpdatedDate1
        }

        this.issueService.update(data1);
        this.tostr.success('Updated Succcessfully', 'Issue Updated');
      }
      this.showSuccessMsg = true;
      setTimeout(() => this.showSuccessMsg = false, 3000);
      this.issueService.form.reset();
    }
  }
 
  //EditTable
  editRow(data) {
    this.issueService.form.setValue(data);
  }

  //Clear Table
  clearForm() {
    this.issueService.form.reset();
  }
}
