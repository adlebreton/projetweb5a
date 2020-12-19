import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent   {

  onSubscribe = true;
  onForgetPassword = false;
  isLoading = false;
  error:string = "";
  fail = false;

  constructor(private route: ActivatedRoute , 
              private router: Router,
              private authService: AuthService) {}

  onSignup() {
    this.onSubscribe = true;
  }

  onSignin() {
    this.onSubscribe = false;
  }

  onPasswordForget(){
    this.onForgetPassword = true;
  }

 
  onSubmit(form: NgForm) {
    
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (!this.onSubscribe) {
      console.log("subscribe");
      authObs = this.authService.login(email, password);
    } else {
      console.log("login");

      authObs = this.authService.signup(email, password);
    }    

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/main']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.fail = true;
        this.error = errorMessage;
        
        this.isLoading = false;
      }
    );

    form.reset();
  }

  

}
