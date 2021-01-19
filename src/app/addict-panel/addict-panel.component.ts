import { Component, Injector, OnInit } from '@angular/core';

import { Confirmpopupservice } from '../main/confirm-popup.service';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from '../main/modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Addiction} from './addictions';

@Component({
  selector: 'app-addict-panel',
  templateUrl: './addict-panel.component.html',
  styleUrls: ['./addict-panel.component.css']
})
export class AddictPanelComponent implements OnInit {
  
  addictList: Array<Addiction> =[];
  nb:number=0;
  name: any;
  addict: any;

  constructor(private confirmationDialogService: Confirmpopupservice,private dialog: MatDialog,private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
  }

  onClickConnexion() {
    this.router.navigate(['../addictions'], {relativeTo: this.route});
  }

  openModal() {
    const dialogRef =  this.dialog.open(ModalComponent, {data: {name: this.name}, disableClose: true});
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.addict = submit;
        this.Add(this.addict);
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
   
    let objAddict = new Addiction();
    objAddict.id=this.nb;
    objAddict.name=texte;
    this.addictList.push(objAddict);
    this.nb+=1;
    
  }

  Supp(i:number,b:boolean)
  {
    if(b==true)
    {
      this.addictList.splice(i,1);
    }
    
  }

}
