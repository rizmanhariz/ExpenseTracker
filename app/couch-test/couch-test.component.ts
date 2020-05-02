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
  data = [
    { 
      categoryName: "Rizman",
      date: new Date(2020, 0, 1),
      name: "araki",
      age: 52
    }
  ]
  constructor(
    private couchService: CouchServiceService
  ) { }

  retrieveCategory(){
    // console.clear()
    console.log('>>>> Category information')
    this.categoryDB.query({}).forEach(category=>console.log(category))
  }

  retrieveExpense(){
    // console.clear()
    console.log('>>>> Expense information')
    this.expenseDB.query({}).forEach(expense=>console.log(expense))
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

  

  ngOnInit() {
    this.expenseDB = this.couchService.getExpenseDB()
    this.categoryDB = this.couchService.getCategoryDB()
  }

}
