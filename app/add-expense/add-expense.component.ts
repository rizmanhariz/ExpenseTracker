import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RouterExtensions, PageRouterOutlet } from 'nativescript-angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit,OnDestroy {
  transactionType: string;
  transactionLabel: string;
  constructor(
    private routerExtensions: RouterExtensions,
    private pro: PageRouterOutlet
  ) {
    
   }

  goBack(){
    if (this.routerExtensions.canGoBack()){
      this.routerExtensions.back()
    } else {
      this.routerExtensions.navigate(['home'])
    }
      
  }


  onReturnPress(args) {
    console.log(args)
  }

  onSubmit(){
    if (this.transactionType==null){
      console.log("Add data")
    } else {
      console.log("Perform edit on ", this.transactionType)
    }
  }


  ngOnInit() {
    this.transactionType = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.transactionType==null) {
      this.transactionLabel = "Add Expense"
      console.log(this.transactionLabel)
    } else {
      this.transactionLabel = "Edit Expense"
    }

    

    
  }

  ngOnDestroy() {

  }

}
