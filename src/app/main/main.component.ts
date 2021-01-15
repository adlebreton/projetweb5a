import { Component, Injector, OnInit } from '@angular/core';

import { Confirmpopupservice } from './confirm-popup.service';

import {Objectif} from './objectif';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

 
  objList: Array<Objectif> =[];
  nb:number=0;
  constructor(private confirmationDialogService: Confirmpopupservice) {}

  ngOnInit() {
  }

  openConfirmationDialog(i:number) 
  {
    this.confirmationDialogService.confirm("Voulez vous vraiment supprimer cet objectif ?","")
    .then((confirmed) => this.Supp(i,confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  Add(){
    let objObj = new Objectif();
    objObj.id=this.nb;
    objObj.name="TEST"+this.nb;
    this.objList.push(objObj);
    this.nb+=1;
    
  }

  Supp(i:number,b:boolean)
  {
    if(b==true)
    {
      this.objList.splice(i,1);
    }
    
  }

}
