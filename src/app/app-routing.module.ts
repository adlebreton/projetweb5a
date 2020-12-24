import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../app/auth/auth.component';
import { AddictPanelComponent } from './addict-panel/addict-panel.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '',  component:HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: MainComponent },
  { path: 'addictions', component: AddictPanelComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
