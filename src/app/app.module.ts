import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AddictPanelComponent } from './addict-panel/addict-panel.component';
import { HomeComponent } from './home/home.component';
import { Confirmpopupservice } from './main/confirm-popup.service';
import { ConfirmationDialogComponent } from './main/confirm-popup.component';
import { ConfirmationDialogComponentAdd } from './main/confirm-popup.component - Add';
import { ConfirmpopupserviceAdd } from './main/confirm-popup.service - Add';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MainComponent,
    AddictPanelComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
   FormsModule,


  ],
  providers: [Confirmpopupservice, ConfirmpopupserviceAdd],
  entryComponents: [ ConfirmationDialogComponent, ConfirmationDialogComponentAdd ],
  bootstrap: [AppComponent]
})
export class AppModule { }
