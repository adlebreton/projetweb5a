import { Component, OnInit } from '@angular/core';
import {Objectif} from './objectif';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  id: number | undefined;
  name: string | undefined;
  objList: Array<Objectif> =[{id:0, name:"essai0"},{id:1,name:"essai1"},{id:2,name:"essai2"}];
  nb:number=0;
  constructor() { }

  ngOnInit() {
  }

  Add(){
    let objObj = new Objectif();
    objObj.id=this.nb;
    objObj.name="TEST";
    this.objList.push(objObj);
    this.name="";
    this.id=0;
    this.nb+=1;

  }

  Supp(i:number)
  {
    this.objList.splice(i,1);
  }

}
