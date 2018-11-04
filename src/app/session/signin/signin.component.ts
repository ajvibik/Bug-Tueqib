import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr:ToastrService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.required , Validators.email] )] ,
      password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    if(this.form.value.email === 'admin@admin.com' && this.form.value.password === 'admin' ){
      this.router.navigate ( [ '/dashboard' ] );
    }
   
  }

  signInWithEmail() {
    this.authService.signInRegular(this.form.value.email, this.form.value.password)
       .then((res) => {
          console.log(res);
          this.toastr.success('Login Succcessfully', 'Welcome');
          this.router.navigate(['dashboard']);
       })
       .catch((err) => 
       this.toastr.warning('UserName or Password wrong', 'Failed')

       );
 }

  signInWithTwitter() {
    this.authService.signInWithTwitter()
    .then((res) => { 
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }

  
  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
         .then((res) => {
            this.router.navigate(['dashboard'])
         })
         .catch((err) => console.log(err));
    }

}
