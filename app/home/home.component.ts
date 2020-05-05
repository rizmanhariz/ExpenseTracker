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
  allCategory: any;
  categoryList: any[]; 
  startDate: Date;
  endDate: Date;
  constructor(
    private firestoreservice: FirestoreService,
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
  ) { }




  navigateTo(inputRoute:string){
    this.routerExtensions.navigate([inputRoute])
  }

  ngOnInit(){
    // get dates from application settings
    this.startDate = new Date(getString('StartDate'))
    this.endDate = new Date(getString('EndDate'))

    console.log(`Home Component - Start Date : ${this.startDate}`)
    console.log(`Home Component - End Date : ${this.endDate}`)

    // Pull all the information needed
      // define the connections
    this.allCategory = this.couchService.getCategoryDB()
    this.expenses = this.couchService.getExpenses(this.startDate, this.endDate)
    // parse information into
    // Sum bylist/category
  }
}
