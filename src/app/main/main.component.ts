import { Component, Injector, OnInit } from '@angular/core';

import { Confirmpopupservice } from './confirm-popup.service';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from './modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Objectif} from './objectif';

import {User} from '../auth/user.model';
import { OrdersService } from './main.component.service';

import { CompileTemplateMetadata } from '@angular/compiler';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  objList: Array<Objectif> =[];
  nb:number=0;
  name: any;
  obj: any;

  ordersService!: OrdersService;
  percent:number=0;


  constructor(private confirmationDialogService: Confirmpopupservice,private dialog: MatDialog,private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
  }

  /*onSubmit () { 
    this.ordersService.form.value.coffeeOrder = this.coffeeOrder; 
    let data = this.ordersService.form.value; 
    
   this.ordersService.createCoffeeOrder (data) 
       .then (res => { 
           / * faites quelque chose ici .... 
           peut-être effacer le formulaire ou donner un message de réussite * / 
       }); 
} */

  onClickConnexion() {
    this.router.navigate(['../addictions'], {relativeTo: this.route});
  }

  openModal() {
    const dialogRef =  this.dialog.open(ModalComponent, {data: {name: this.name}, disableClose: true});
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.obj = submit;
        this.Add(this.obj);
      }   
    })
   }


  openConfirmationDialog(i:number) 
  {
    this.confirmationDialogService.confirm("","")
    .then((confirmed) => this.Supp(i,confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  Add(texte :string){
   
    let objObj = new Objectif();
    objObj.id=this.nb;
    objObj.name=texte;
    this.objList.push(objObj);
    this.nb+=1;
    this.actualisePercent();
  }


  
  toggleCheck(i:number){
    this.objList[i].check=!this.objList[i].check;
  }

  actualisePercent(){
    let compte=0;
    for(let i=0; i<this.nb;i++){
      if(this.objList[i].check){
        compte++;
      }
    }
    this.percent=(compte/this.nb)*100;
  }


  Supp(i:number,b:boolean)
  {
    if(b==true)
    {
      this.objList.splice(i,1);
      this.nb--;
      this.actualisePercent();
    }
    
  }

}
