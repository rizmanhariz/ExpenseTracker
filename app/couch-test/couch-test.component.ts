import { FirestoreService } from './../services/firestore.service';
import { CouchServiceService } from './../services/couch-service.service';
import { Component, OnInit } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';
@Component({
  selector: 'app-couch-test',
  templateUrl: './couch-test.component.html',
  styleUrls: ['./couch-test.component.css']
})
export class CouchTestComponent implements OnInit {
  expenseDB: any;
  categoryDB: any;


  catData = [
    {
      categoryMaxVal : 100,
      categoryRemark : "Test",
      categoryName : "Food",
      categoryIMG : "res://test_icon_1"
    },
    {
      categoryMaxVal : 100,
      categoryRemark : "Test2",
      categoryName : "Games",
      categoryIMG : "res://test_icon_2"
    },
  ]

  expData = [
    {
      expenseCategory: "Food",
      expenseVal: 100,
      expenseRemark: "Test",
      expenseName: "Test 1",
      expenseDate: new Date(2020,5,5)
    },
    {
      expenseCategory: "Games",
      expenseVal: 150,
      expenseRemark: "Test",
      expenseName: "Test 2",
      expenseDate: new Date(2020,5,5)
    },
    {
      expenseCategory: "Food",
      expenseVal: 100,
      expenseRemark: "Test",
      expenseName: "Test 3",
      expenseDate: new Date(2020,6,5)
    },
    {
      expenseCategory: "Food",
      expenseVal: 33,
      expenseRemark: "Test",
      expenseName: "Test 4",
      expenseDate: new Date(2020,5,5)
    },
  ]

  constructor(
    private couchService: CouchServiceService,
    private firestoreService: FirestoreService,
  ) { }

  initData(){
    this.catData.forEach(cat=>{
      this.categoryDB.createDocument(cat)
    })

    this.expData.forEach(exp=>{
      this.expenseDB.createDocument(exp)
    })
  }

  retrieveCategory(){
    // console.clear()
    console.log('>>>> Category information')
    this.categoryDB.query({}).forEach(category=>console.log(category))
  }

  retrieveExpense(){
    // console.clear()
    console.log('>>>> Expense information')
    // this.expenseDB.query({}).forEach(expense=>console.log(expense))
    console.log(this.couchService.getExpenses(new Date(2020,2,15), new Date(2020,7,1)))

  }

  getAllExpenses(){
    console.log(this.expenseDB.query({}))
  }

  deleteData(){
    this.couchService.resetDatabases()
  }

  deleteCategory(){
    this.couchService.resetCategoryDB()
  }

  deleteExpense(){
    this.couchService.resetExpenseDB()
  }

  fireStoreButton(){
    // this.firestoreService.addFirebaseData("userID")
    // this.firestoreService.deleteFirebaseData("userID")
    this.firestoreService.retrieveFirebaseData("userID")
  }

  

  ngOnInit() {
    this.expenseDB = this.couchService.getExpenseDB()
    this.categoryDB = this.couchService.getCategoryDB()
  }

  
}
