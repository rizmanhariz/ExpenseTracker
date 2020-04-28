import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit,OnDestroy {
  myval: string; 
  constructor(
    private routerExtensions: RouterExtensions
  ) {
    
   }

  goBack(){
    if (this.routerExtensions.canGoBack()){
      this.routerExtensions.back()
    } else {
      this.routerExtensions.navigate(['home'])
    }
      
  }

  changeVal(){
    this.myval = "New stringy"
  }

  onReturnPress(args) {
    console.log(args)
  }


  ngOnInit() {
    this.myval = "Strinigy"
  }

  ngOnDestroy() {
    console.log("I HAVE BEEN DESTROYED")
  }

}
