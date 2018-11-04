import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IssueService } from '../../../core/services/issue.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  
  issueList : AngularFireList<any>;
  deleteUserMsg : boolean;
  rows = [];
  temp = [];
  selected = [];


  constructor(private issueService : IssueService, private firebaseDatabase: AngularFireDatabase,private router : Router,private tostr: ToastrService) { }
  ngOnInit() {
    this.issueService.getAll().subscribe(
      list => {
        this.rows = list.map(item => {
          return {
            $key: item.key, 
            ...item.payload.val()
          };
        });
        this.temp = list.map(item => {
          return {
            $key: item.key, 
            ...item.payload.val()
          };
        });
      });
  }

  // updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   // filter our data
  //   const temp = this.temp.filter(function(d) {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   // update the rows
  //   this.rows = temp;
  // }

  // deleteRow(rowIndex) {
  //   let temp = [...this.rows];
  //   temp.splice(rowIndex, 1);
  //   this.rows = temp;
  //   }

    editRow(data) {
     this.router.navigate(['/issues/createIssue']);
     this.issueService.edit(data);
    }
  
  
    deleteRow(key) {
      if (confirm("Are you Sure to delete this User?")){
        this.issueService.deleteRow(key);
        this.tostr.warning("Deleted Successfully", "Employee register");
        this.deleteUserMsg =true;
        setTimeout(() => {
          this.deleteUserMsg=false
        }, 3000);
      }
    }

    // detailpage(row){
    //   this.editRow(row);
    //  //this.router.navigate(['/issues/detailpage', row.selected[0].issueId]);
    // }
    selectCheck(row, column, value) {
      return row.name !== 'Ethel Price';
    }

    onSelect({ selected }) {
      //console.log('Select Event', selected, this.selected);
    }
  
    onActivate(event) {
     // console.log('Activate Event', event);
    }

  }
