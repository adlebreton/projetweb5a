import { AngularFirestore } from '@angular/fire/firestore';
import { DebugElement, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Objectif } from './objectif';



@Injectable({
  providedIn: 'root'
})

export class ListeService {
  percent: number=2;

  constructor(private firestore: AngularFirestore) {}


  ajouteObjectif(data: Objectif) {

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Objectif")
        .doc("user1").collection("objectifs")
        .add(Object.assign({}, data))
        .then(res => { }, err => reject(err));
    });
  }

  recupereObjectifs() {
    return this.firestore.collection("Objectif").doc("user1").collection("objectifs").snapshotChanges();
  }
  updateProduit(data: any, ischecked: boolean) {
    return this.firestore.collection("Objectif").doc("user1").collection("objectifs").doc(data.payload.doc.id).set({ check: ischecked }, { merge: true });
  }

  supprimeProduit(data: any) {
    return this.firestore.collection("Objectif").doc("user1").collection("objectifs").doc(data.payload.doc.id).delete();
  }
} 