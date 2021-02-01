import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

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
              private dialog: MatDialog,
              private router: Router,
              private authService: AuthService) {}

  onSignup() {
    this.onSubscribe = true;
  }

  onSignin() {
    this.onSubscribe = false;
  }

  onPasswordForget(){
    //this.onForgetPassword = true;
    const dialogRef =  this.dialog.open(ModalComponent, {data:{}, disableClose: true});
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        //submit.texte
        //chercher dans BDD (firebase) si l'email correspond a un utilisateur, si oui, envoyer email avec code
        //emailJS?
        var email  = require('emailjs/email');
        var server  = email.server.connect({
          user:    "admin@stopAdict.com", 
          password:"password", 
          host:    "smtp.stopAdict.com", 
          ssl:     true,
          port: 465
       });
       server.send({
          text:    "Your message body text", 
          from:    "<sender’s email>", 
          to:      submit.texte,
          subject: "Mot de passe stopAdict",
        }, function(err, message) { 
          if(err)
            console.log(err);
          else
            res.json({success: true, msg: 'sent'});
        });     
      }   
    });
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
