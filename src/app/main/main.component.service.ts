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


  ajouteObjectif(data: Objectif, addictid : string) {

    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection("User1").doc("Addictions").collection("addictions").doc(addictid).collection("objectifs")
        .add(Object.assign({}, data))
        .then(res => { }, err => reject(err));
    });
  }

  recupereObjectifs(addictid : string) {
    return this.firestore.collection("User1").doc("Addictions").collection("addictions").doc(addictid).collection("objectifs").snapshotChanges();
  }
  updateProduit(data: any, ischecked: boolean, addictid : string) {
    return this.firestore.collection("User1").doc("Addictions").collection("addictions").doc(addictid).collection("objectifs").doc(data.payload.doc.id).set({ check: ischecked }, { merge: true });
  }

  supprimeProduit(data: any, addictid : string) {
    return this.firestore.collection("User1").doc("Addictions").collection("addictions").doc(addictid).collection("objectifs").doc(data.payload.doc.id).delete();
  }
} 