import { Injectable } from '@angular/core';
import { firestore } from 'nativescript-plugin-firebase'
const firebase = require("nativescript-plugin-firebase/app");

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  addFirebaseData():void {
    // firebase.firestore().collection('babi').add({name:'Rizman Hariz'})
    firebase.firestore().collection('babi').doc('babi2').collection('babiBARU').add({name:'Rizman Hariz'})
      .then((docRef: firestore.DocumentReference) => {
        console.log("Reference success: " + docRef.id)
      })
      .catch(err => console.log("Error adding data: " + err))
  }

  retrieveFirebaseData():void {
    const collectionRef: firestore.CollectionReference = 
      firebase.firestore()
        .collection('babi')
        // .doc('date1')
        // .collection('subdoc1')
    
    // console.(`${collectionRef}`)

    // const collectionRef: firestore.CollectionReference = firebase.firestore().collection('babi')
    // console.log(">> collectionRef.parent "+ collectionRef.parent);

    // collectionRef.get({source: "cache"})
    collectionRef.get()
      .then((querySnapshot:firestore.QuerySnapshot) => {
        querySnapshot.forEach(doc => console.log(`${doc.id} => ${JSON.stringify(doc.data())}`))
      })
      .catch(err => console.log(`>>>Error: ${err}`))
  }

  enableNetwork(){
    firebase.firestore().enablePersistence()
    
    // enableNetwork()
    //   .then(()=>console.log("it been enabled"))
    //   .catch(err=>console.log(err))
  }

  disableNetwork(){
    firebase.firestore().disableNetwork()
      // .then(()=>console.log("its been disabled"))
      // .catch(err=>console.log(err))
  }
}
