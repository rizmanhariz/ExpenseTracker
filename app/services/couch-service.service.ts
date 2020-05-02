import { Injectable, OnInit } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';

@Injectable({
  providedIn: 'root'
})
export class CouchServiceService {
  categoryDB: any;
  expenseDB: any;

  constructor() { 
    console.log('>>>>> Readying CouchbaseDB')
    this.categoryDB = new Couchbase('category')
    this.expenseDB = new Couchbase('expense')
  }

  getCategoryDB() {
    return this.categoryDB
  }

  getExpenseDB() {
    return this.expenseDB
  }

  getCategoryList(){
    let categoryList = []
    this.categoryDB.query({}).forEach(category=>{
      categoryList.push(category.categoryName)
    })

    return categoryList
  }

  resetDatabases(){
    this.resetCategoryDB()
    this.resetExpenseDB()
  }

  resetCategoryDB(){
    let res1 = this.categoryDB.query({})

    res1.forEach(elem=>{
      this.categoryDB.deleteDocument(elem.id)
      console.log(`${elem.id} deleted`)
    })
  }

  resetExpenseDB(){
    let res2 = this.expenseDB.query({})

    res2.forEach(elem=>{
      this.expenseDB.deleteDocument(elem.id)
      console.log(`${elem.id} deleted`)
    })
  }
}
