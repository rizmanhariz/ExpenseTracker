import { getString } from 'tns-core-modules/application-settings';
import { CouchServiceService } from './../services/couch-service.service';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  expenses: any;
  categoryList: Array<string>;
  allCategory: any;
  // categoryList: any; 
  startDate: Date;
  endDate: Date;
  tempData:any;
  pieValues: Array<Object>;
  constructor(
    private firestoreservice: FirestoreService,
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
  ) { }

  getDateString(inputDate: Date) {
    return inputDate.toString()
  }




  navigateTo(inputRoute:string){
    this.routerExtensions.navigate([inputRoute])
  }

  ngOnInit(){
    // get dates from application settings
    this.startDate = new Date(getString('StartDate'))
    this.endDate = new Date(getString('EndDate'))

    // console.log(`Home Component - Start Date : ${this.startDate}`)
    // console.log(`Home Component - End Date : ${this.endDate}`)

    // Pull all the information needed
      // define the connections
    this.allCategory = this.couchService.getCategoryDB().query({})
    this.categoryList = this.couchService.getCategoryList()
    this.expenses = this.couchService.getExpenses(this.startDate, this.endDate)

    console.log(this.categoryList)
    
    this.pieValues=[]
    this.categoryList.forEach(cat => {
      this.pieValues.push({
        "categoryName": cat,
        "spent": 0
      })
    })
    this.pieValues.push({
      "categoryName": 'Others',
      "spent": 0
    })


    console.log(this.expenses)
    this.expenses.forEach(expense => {
      let ind = this.pieValues.findIndex( elem => elem['categoryName'] === expense.expenseCategory)
      if (ind === -1) {
        this.pieValues[this.pieValues.length-1]["spent"] += expense.expenseVal
      } else {
        this.pieValues[ind]["spent"] += expense.expenseVal
      }
    })


    if (this.pieValues[this.pieValues.length-1]["spent"] === 0){
      this.pieValues.pop()
    }

  

    
  }
}
