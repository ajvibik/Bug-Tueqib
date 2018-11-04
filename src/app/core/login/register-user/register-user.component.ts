import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private userService: UserService) { }
  submitted: boolean;
  showSuccessMsg: boolean;
  formControls = this.userService.form.controls;

  ngOnInit() {

  }

  addUser() {
    this.submitted = true;
    if (this.userService.form.valid) {
      if (this.userService.form.get('$key').value == null)
        //insert
        this.userService.addUser(this.userService.form.value);
      else
        //update
        this.userService.updateUser(this.userService.form.value);
      this.showSuccessMsg = true;
      setTimeout(() => this.showSuccessMsg = false, 3000);
      this.submitted = false;
      this.userService.form.reset();
    }
  }
}
