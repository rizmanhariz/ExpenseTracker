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
  allExpenses: any;
  categoryDB: any;
  categoryList: any[]; 
  constructor(
    private firestoreservice: FirestoreService,
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
  ) { }




  navigateTo(inputRoute:string){
    this.routerExtensions.navigate([inputRoute])
  }

  ngOnInit(){
    // this.allExpenses = this.couchService.getAllExpenses()
    // this.categoryDB = this.couchService.getCategoryDB()
    // this.categoryList = this.couchService.getCategoryList()


  }
}
