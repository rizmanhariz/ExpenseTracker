import { Expense } from './../interfaces/expense';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RouterExtensions, PageRouterOutlet } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit,OnDestroy {
  transactionType: string;
  transactionLabel: string;
  categoryProvider: string[] = ["Select Category"] 
  private _expense: Expense;
  constructor(
    private routerExtensions: RouterExtensions,
    private pro: PageRouterOutlet,
    private page: Page
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
      console.log(this._expense)
    } else {
      console.log("Perform edit on ", this.transactionType)
    }
  }

  get expense(): Expense{
    return this._expense;
  }


  ngOnInit() {
    this.transactionType = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.transactionType==null) {
      this.transactionLabel = "Add Expense"
      console.log(this.transactionLabel)
      this._expense = new Expense("", "", new Date(), 0.00, "")
      // this._expense = new Expense()
    } else {
      this.transactionLabel = "Edit Expense"
    }

    // Get the list of categories from list provider
    // this.categoryProvider=this.categoryProvider.concat(['Food','Fun','Fancy'])
    // above is seidp

    if ((this.categoryProvider.length==1) && (this.categoryProvider[0]=='Select Category')){
      // this.routerExtensions.navigate(['addCat'])
      this.categoryProvider=this.categoryProvider.concat(['Food','Fun','Fancy'])
    } else {
      console.log("Its ok")
    }

    

    
  }

  ngOnDestroy() {

  }

}
