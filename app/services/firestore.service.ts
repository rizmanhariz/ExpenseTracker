import { CouchServiceService } from './couch-service.service';
import { Injectable } from '@angular/core';
import { firestore } from 'nativescript-plugin-firebase'
const firebase = require("nativescript-plugin-firebase/app");

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private couchService: CouchServiceService,
  ) { }

  addFirebaseData(userID:string):void {
    let expenses = this.couchService.getAllExpenses()
    let categories = this.couchService.getAllCategory()

    let batch = firebase.firestore().batch()
    expenses.forEach(exp=>{
      let docRef = firebase.firestore().collection(userID).doc('data').collection('expenses').doc()
      // let writeID = exp.id
      delete exp.id
    
      batch.set(docRef, exp)
    })
    batch.commit()
    .then(()=>console.log(`Expenses Batch successfully committed`))


    let catBatch = firebase.firestore().batch()
    categories.forEach(cat=>{
      let docRef = firebase.firestore().collection(userID).doc('data').collection('categories').doc()
      // let writeID = cat.id
      delete cat.id
      catBatch.set(docRef, cat)

    })

    catBatch.commit()
    .then(()=>console.log(`Category Batch succesfully commited`))

    // firebase.firestore().collection('babi').doc('babi2').collection('babiBARU').add({name:'Rizman Hariz'})
    //   .then((docRef: firestore.DocumentReference) => {
    //     console.log("Reference success: " + docRef.id)
    //   })
    //   .catch(err => console.log("Error adding data: " + err))
  }

  retrieveFirebaseData(userID: string):void {
    let collectionRef: firestore.CollectionReference = 
      firebase.firestore().collection(userID).doc('data').collection('expenses')
    let expenseDB = this.couchService.getExpenseDB()
    let categoryDB = this.couchService.getCategoryDB()
    
    collectionRef.get()
      .then((querySnapshot:firestore.QuerySnapshot) => {
        querySnapshot.forEach(doc => {
          expenseDB.createDocument(doc.data())
        })
        console.log("Expenses complete")
      })
      .catch(err => console.log(`>>>Error: ${err}`))
    
    
    let catCollectionRef: firestore.CollectionReference = 
      firebase.firestore().collection(userID).doc('data').collection('categories')

    catCollectionRef.get()
      .then((querySnapshot:firestore.QuerySnapshot) => {
        querySnapshot.forEach(doc => {
          categoryDB.createDocument(doc.data())
        })
        console.log("Categories complete")
      })
      .catch(err => console.log(`>>>Error: ${err}`))
    
  }

  deleteFirebaseData(userID: string):void {
    let collectionRef: firestore.CollectionReference = 
      firebase.firestore().collection(userID).doc('data').collection('expenses');
    
    collectionRef.get()
      .then((querySnapshot:firestore.QuerySnapshot) => {

        let batch = firebase.firestore().batch()

        querySnapshot.forEach(doc=>{
          batch.delete(doc.ref)
        })

        batch.commit()
        .then(()=>console.log('deletion compelte'))
        .catch((err)=>console.log(err))
      })

    collectionRef = firebase.firestore().collection(userID).doc('data').collection('categories');

    collectionRef.get()
      .then((querySnapshot:firestore.QuerySnapshot) => {

        let batch = firebase.firestore().batch()

        querySnapshot.forEach(doc=>{
          batch.delete(doc.ref)
        })

        batch.commit()
        .then(()=>console.log('deletion compelte'))
        .catch((err)=>console.log(err))
      })
  }
}
