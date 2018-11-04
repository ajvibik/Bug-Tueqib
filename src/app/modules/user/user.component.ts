import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  UserArray = [];
  deleteUserMsg : boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      list => {
        this.UserArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  editRow(data) {
    this.userService.editRow(data);
  }


  deleteRow(key) {
    if (confirm("Are you Sure to delete this User?")){
      this.userService.deleteRow(key);
      this.deleteUserMsg =true;
      setTimeout(() => {
        this.deleteUserMsg=false
      }, 3000);
    }
  }
}
