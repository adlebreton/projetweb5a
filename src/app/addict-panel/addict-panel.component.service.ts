import { AngularFirestore } from '@angular/fire/firestore';
import { DebugElement, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Addiction } from './addictions';


@Injectable({
  providedIn: 'root'
})

export class AddictionService {
  
  constructor(private firestore: AngularFirestore) {}


  ajouteAddiction(data: Addiction) {

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Addiction")
        .doc("user1").collection("addictions")
        .add(Object.assign({}, data))
        .then(res => { }, err => reject(err));
    });
  }

  recupereAddictions() {
    return this.firestore.collection("Addiction").doc("user1").collection("addictions").snapshotChanges();
  }
  updateProduit(data: any, ischecked: boolean) {
    return this.firestore.collection("Addiction").doc("user1").collection("addictions").doc(data.payload.doc.id).set({ check: ischecked }, { merge: true });
  }

  supprimeProduit(data: any) {
    return this.firestore.collection("Addiction").doc("user1").collection("addictions").doc(data.payload.doc.id).delete();
  }
} 