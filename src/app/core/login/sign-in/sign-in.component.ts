import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userName : string;
  password : string;
  role : string;
  constructor( private router : Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  LoginFn(userName, password, role){
    if(userName ==='admin' && password ==='admin' ){
      this.router.navigate(['/register']);
    }
    else{
      this.toastr.error("Please login again");
    }
  }

}
