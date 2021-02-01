import {AngularFirestore} from '@angular/fire/firestore'; 

export class OrdersService { 

    constructor (private firestore : AngularFirestore)
    {

    } 
    
   /*createObj (data) { 
    return new Promise <any> ((resolve, reject) => { 
        this.firestore 
            .collection ("coffeeOrders") 
            .add (data) 
            .then (res => {}, err => reject (err)); 
    }); */
} 
    }