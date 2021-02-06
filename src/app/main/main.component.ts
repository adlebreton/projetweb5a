import { Component, Injector, ViewEncapsulation,OnInit } from '@angular/core';

import { Confirmpopupservice } from './confirm-popup.service';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from './modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Objectif } from './objectif';

import { User } from '../auth/user.model';
import { ListeService } from './main.component.service';

import { CompileTemplateMetadata } from '@angular/compiler';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AddictionService } from '../addict-panel/addict-panel.component.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],  
})
export class MainComponent implements OnInit {


  nb: number = 0;
  name: any;
  obj: any;
  percent: number = 0;
  objList: any;
  addictList : any;

  constructor(private confirmationDialogService: Confirmpopupservice, private dialog: MatDialog, private route: ActivatedRoute,
  private router: Router, private listeService: ListeService,private addictService: AddictionService) { }

  recupereObj = () => this.listeService.recupereObjectifs().subscribe(res => (this.objList = res));
  recupereAdd = () => this.addictService.recupereAddictions().subscribe(res => (this.addictList = res));

  actualisePercent = () => this.listeService.recupereObjectifs().subscribe(actions => {this.percent=0; this.nb=0;actions.forEach(action => 
      {
        if (action.payload.doc.data()['check'] == true) 
        {
          this.percent += 1;
        }
        this.nb+=1;
      });
      this.percent=(this.percent/this.nb) *100 ;
    }); 

  
  toggleCheck = (o: Objectif, b: boolean) => this.listeService.updateProduit(o, b);
 
  supprime = (data: any) => this.listeService.supprimeProduit(data);

  ngOnInit() {
    this.update();
    this.actualisePercent();
  }

  update() {
    this.recupereObj();
    this.recupereAdd();
  }


  onClickConnexion() {
    this.router.navigate(['../addictions'], { relativeTo: this.route });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, { data: { name: this.name }, disableClose: true });
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.obj = submit;
        this.Add(this.obj);
      }
    })
  }

  openConfirmationDialog(_objectif: Objectif) {
    this.confirmationDialogService.confirm("", "")
      .then((confirmed) => this.Supp(_objectif, confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  Add(texte: string) {

    this.obj = new Objectif(texte, false);
    this.listeService.ajouteObjectif(this.obj)
      .then(res => {
        // On affiche un message et on vide le champs du formulaire
      });

    this.update();
   this.actualisePercent();
  }

 

  Supp(_objectif: Objectif, b: boolean) {
    if (b == true) {
      this.supprime(_objectif);
      this.actualisePercent();
    }

  }

}
