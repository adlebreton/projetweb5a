import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './main/modal.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AddictPanelComponent } from './addict-panel/addict-panel.component';
import { HomeComponent } from './home/home.component';
import { Confirmpopupservice } from './main/confirm-popup.service';
import { ConfirmationDialogComponent } from './main/confirm-popup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AngularFireModule} from "@angular/fire"; 
import {AngularFirestoreModule} from "@angular/fire/firestore"; 
import {environment} from "src/environments/environment"; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MainComponent,
    AddictPanelComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,

    BrowserAnimationsModule, NoopAnimationsModule,
    AngularFireModule.initializeApp (environment.firebaseConfig), 
    AngularFirestoreModule 
    BrowserAnimationsModule, NoopAnimationsModule, NgbModule
    
  ],
  providers: [Confirmpopupservice],
  entryComponents: [ConfirmationDialogComponent, ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
