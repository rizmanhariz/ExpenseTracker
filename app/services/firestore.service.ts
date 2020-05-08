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

  async backupFirebase(userID:string): Promise<boolean>{
    // delete existing firebase stuff
    // Add current firebasestuff.
    return firebase.firestore().collection(userID).doc('data').collection('expenses')
    .get()
    .then((querySnapshot:firestore.QuerySnapshot) => {
      let batch = firebase.firestore().batch()
      querySnapshot.forEach(doc=>{
        batch.delete(doc.ref)
      })

      return batch
    })
    .then((batch)=>{
      // console.log("firstcommit"); 
      return batch.commit()})
    .then(()=>{
        return firebase.firestore().collection(userID).doc('data').collection('categories').get()
    })
    .then((querySnapshot:firestore.QuerySnapshot) => {

      let batch = firebase.firestore().batch()

      querySnapshot.forEach(doc=>{
        batch.delete(doc.ref)
      })

      return batch
    })
    .then((batch)=>{
      // console.log("secondcommit"); 
      return batch.commit()})
    .then(()=>{
      let expenses = this.couchService.getAllExpenses()
      let batch = firebase.firestore().batch()
      expenses.forEach(exp=>{
        let docRef = firebase.firestore().collection(userID).doc('data').collection('expenses').doc()
        delete exp.id
      
        batch.set(docRef, exp)
      })
      return batch
    })
    .then(batch=>{
      // console.log("third write commit");
      return batch.commit()})
    .then(()=>{
      let categories = this.couchService.getAllCategory()
      let catBatch = firebase.firestore().batch()
      categories.forEach(cat=>{
        let docRef = firebase.firestore().collection(userID).doc('data').collection('categories').doc()
    
        delete cat.id
        catBatch.set(docRef, cat)
      })

      return catBatch
    })
    .then(batch=>{
      // console.log("fourth write commit"); 
      return batch.commit()})
    .then(()=>{
      // console.log('completed'); 
      return true})
  }

  async restorefromFirebase(userID:string): Promise<boolean>{
    let expenseData = []
    let categoryData = []
    return firebase.firestore().collection(userID).doc('data').collection('expenses').get()
    .then((querySnapshot:firestore.QuerySnapshot) => {
      querySnapshot.forEach(doc => {
        // expenseDB.createDocument(doc.data())
        expenseData.push(doc.data())
      })
      // console.log("Expenses complete")

      return "Attempt categories"
    })
    .then((inputString:string)=>{
      // console.log(inputString)
      return firebase.firestore().collection(userID).doc('data').collection('categories').get()
    })
    .then((querySnapshot:firestore.QuerySnapshot) => {
      querySnapshot.forEach(doc => {
        // categoryDB.createDocument(doc.data())
        categoryData.push(doc.data())
      })
      return true
    })
    .then((inupt)=>{
      // console.log(`Deleting the local data: ${inupt}`)
      this.couchService.resetDatabases()
      return true
    })
    .then((retVal:boolean)=>{
      let expenseDB = this.couchService.getExpenseDB()
      let categoryDB = this.couchService.getCategoryDB()

      expenseData.forEach(expense=>{
        expenseDB.createDocument(expense)
      })

      categoryData.forEach(category=>{
        categoryDB.createDocument(category)
      })
      
    })
    .then(()=>{
      return true
    })
  }

  async addFirebaseData(userID:string) {
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
  }

  async retrieveFirebaseData(userID: string) {
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

  deleteFirebaseData(userID: string){
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
      .then(()=>{
        collectionRef = firebase.firestore().collection(userID).doc('data').collection('categories');

        collectionRef.get()
          .then((querySnapshot:firestore.QuerySnapshot) => {

            let batch = firebase.firestore().batch()

            querySnapshot.forEach(doc=>{
              batch.delete(doc.ref)
            })

            batch.commit()
            .then(()=>console.log('cate deletion compelte'))
            .catch((err)=>console.log(err))
          })
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

  deleteFirestoreExpenses(userID){
    firebase.firestore().collection(userID).doc('data').collection('expenses')
    .get()
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
