import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  constructor(private firebaseDatabase: AngularFireDatabase) { }
  issueList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    issueId: new FormControl(null),
    project: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    assigned: new FormControl('', Validators.required),
    reporter: new FormControl('', Validators.required),
    assertId: new FormControl('', Validators.required),
    assertName: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    severity: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    createdBy: new FormControl(null),
    updatedBy: new FormControl(null)
  });


  //Get All
  getAll() {
    this.issueList = this.firebaseDatabase.list('/issue');
    return this.issueList.snapshotChanges();
  }  

  //Get by ID
  get(id) {
    
     return this.firebaseDatabase.database.ref('/issue').orderByChild("assertId").equalTo("asdc").on("child_added", function (data) {
       console.log(data.val());
      return data.val();
    });
   
  }

  //POST
  add(issue) {
    this.issueList.push(
      {
        issueId: issue.issueId,
        project: issue.project,
        summary: issue.summary,
        assigned: issue.assigned,
        reporter: issue.reporter,
        assertId: issue.assertId,
        assertName: issue.assertName,
        status: issue.status,
        severity: issue.severity,
        priority: issue.priority,
        createdBy: issue.createdBy,
        updatedBy: issue.updatedBy
      }
    );
  }

  //PUT
  update(issue) {
    this.issueList.update(issue.$key, {
      issueId: issue.issueId,
      project: issue.project,
      summary: issue.summary,
      assigned: issue.assigned,
      reporter: issue.reporter,
      assertId: issue.assertId,
      assertName: issue.assertName,
      status: issue.status,
      severity: issue.severity,
      priority: issue.priority,
      createdBy: issue.createdBy,
      updatedBy: issue.updatedBy
    });
  }

  //DELETE
  deleteRow($key: string) {
    this.issueList.remove($key);
  }

  edit(data) {
    this.form.setValue(data);
  }
}
