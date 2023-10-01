import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { RestapiService } from '../services/restapi.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { SnackbarService } from '../core/snackbar.service';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide = true;
  public loginForm : FormGroup
  constructor(
    private _snack : SnackbarService,
    private formBuilder : FormBuilder,
    private router : Router,
    private authService:AuthService,
  ){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
    });
  }

  isEmailInvalid() {
    return this.loginForm.get('email')?.invalid && (this.loginForm.get('email')?.dirty || this.loginForm.get('email')?.touched);
  }

  isEmailRequired() {
    return this.loginForm.get('email')?.hasError('required');
  }

  isEmailInvalidFormat() {
    return this.loginForm.get('email')?.hasError('email');
  }

  isPasswordInvalid() {
    return this.loginForm.get('password')?.invalid && (this.loginForm.get('password')?.dirty || this.loginForm.get('password')?.touched);
  }

  isPasswordRequired() {
    return this.loginForm.get('password')?.hasError('required');
  }

  isPasswordTooShort() {
    return this.loginForm.get('password')?.hasError('minlength');
  }
  isFormInvalid() {
    return !this.loginForm.valid;
  }

  ngOnInit(): void {}
  
  // showSignupForm(){
  //   const dialogConfig = new MatDialogConfig();

  //       dialogConfig.disableClose = true;
  //       dialogConfig.autoFocus = true;

  //       this.dialog.open(SignupComponent, dialogConfig);
  // }

  login() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (data: any) => { 
            console.log(data.jwtToken);
            this._snack.openSnackBar("login success")
            localStorage.setItem('token', data.jwtToken);
            this.router.navigate(['/controlpanel']);
          },
          error => {
            if(error.status===401){
              this._snack.openSnackBar('Invalid Credentials');
            }else{
              console.error('Login Failed',error);
            }
          }
        );
    }
  }
}
