import { FirestoreService } from './../services/firestore.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Expense_Tracker';
  private counter = 42;

  constructor(
    private firestoreservice: FirestoreService
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
}
