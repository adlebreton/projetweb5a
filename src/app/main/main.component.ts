import { Component, Injector, OnInit } from '@angular/core';

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


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  nb: number = 0;
  name: any;
  obj: any;
  percent: number = 0;
  objList: any;


  constructor(private confirmationDialogService: Confirmpopupservice, private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private listeService: ListeService) { }

  recupereObj = () => this.listeService.recupereObjectifs().subscribe(res => (this.objList = res));

  ngOnInit() {
    this.update();
    this.actualisePercent();
  }

  update() {
    this.recupereObj();
   
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

  toggleCheck = (o: Objectif, b: boolean) => this.listeService.updateProduit(o, b);



  actualisePercent() {
  
    this.update();
    let compte = 0;
    for (let i = 0; i < this.objList.size; i++) {
      if (this.objList[i].check) {
        compte++;
      }
    }
    this.percent = (compte / this.objList.size) * 100;

  }

  supprime = (data: any) => this.listeService.supprimeProduit(data);

  Supp(_objectif: Objectif, b: boolean) {
    if (b == true) {
      this.supprime(_objectif);
      this.actualisePercent();
    }

  }

}
