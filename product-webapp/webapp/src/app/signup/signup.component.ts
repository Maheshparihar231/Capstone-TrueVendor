import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../services/restapi.service';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide = true;
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private authService:AuthService
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userRole: ['', Validators.required],
      agree: [false]
    });
  }

  ngOnInit(): void { }

  getErrorMessage() {
    if (this.signupForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signupForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }

  passwordsDoNotMatch(): boolean {
    const password = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;
    return password !== confirmPassword;
  }

  isEmailInvalid() {
    return this.signupForm.get('email')?.invalid && (this.signupForm.get('email')?.dirty || this.signupForm.get('email')?.touched);
  }

  isEmailRequired() {
    return this.signupForm.get('email')?.hasError('required');
  }

  isEmailInvalidFormat() {
    return this.signupForm.get('email')?.hasError('email');
  }

  isPasswordInvalid() {
    return this.signupForm.get('password')?.invalid && (this.signupForm.get('password')?.dirty || this.signupForm.get('password')?.touched);
  }

  isPasswordRequired() {
    return this.signupForm.get('password')?.hasError('required');
  }

  isPasswordTooShort() {
    return this.signupForm.get('password')?.hasError('minlength');
  }
  isFormInvalid() {
    //console.log(this.signupForm.value.agree)
    if(this.signupForm.value.agree){
      return !this.signupForm.valid
    }
    //return !this.signupForm.valid == !this.signupForm.value.agree;
    return !false;
  }

  onSubmit(){
    if (this.signupForm.valid){
      const signupData = this.signupForm.value;
      console.log(signupData);
      this.authService.signUp(signupData.email,signupData.password,signupData.userRole).subscribe(
        (res)=>{
          alert('User registered success');
          this.router.navigate(['/login']);
        },
        (error)=>{
          if(error.status===409){
            alert('Email Already registered');
            this.router.navigate(['/login']);
          }else{
            console.error('SignUp Failed',error);
          }
        }
      )
    }
  }
}
