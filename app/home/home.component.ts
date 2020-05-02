import { FirestoreService } from './../services/firestore.service';
import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Expense_Tracker';
  private counter = 42;

  constructor(
    private firestoreservice: FirestoreService,
    private routerExtensions: RouterExtensions
  ) { }

  public getMessage() {
    return this.counter > 0 ?
      `${this.counter} taps left` :
      'Hoorraaay! You unlocked the NativeScript clicker achievement!';
  }

  public onTap() {
    this.counter--;
  }

  addData() {
    this.firestoreservice.addFirebaseData()
  }

  getData() {
    this.firestoreservice.retrieveFirebaseData()
  }

  enableNetwork(){
    this.firestoreservice.enableNetwork()
  }

  disableNetwork(){
    this.firestoreservice.disableNetwork()
  }

  navigateTo(inputRoute:string){
    this.routerExtensions.navigate([inputRoute])
  }

  toCategory(){
    this.routerExtensions.navigate(['./category'])
  }

  toAddExpense(){
    this.routerExtensions.navigate(['./addExpense'])
  }

  toEditExpense(){
    this.routerExtensions.navigate(['./editExpense',"54"])
  }

  toAddCat(){
    this.routerExtensions.navigate(['./addCategory'])
  }

  toEditCat(){
    this.routerExtensions.navigate(['./editCategory', "100"])
  }
}
