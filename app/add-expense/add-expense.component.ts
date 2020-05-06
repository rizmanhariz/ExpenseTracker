import { Validators } from '@angular/forms';
// import { FormBuilder } from '@angular/forms';
import { CouchServiceService } from './../services/couch-service.service';
import { Expense } from './../interfaces/expense';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RouterExtensions, PageRouterOutlet } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import * as utils from "tns-core-modules/utils/utils"
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit,OnDestroy {
  expenseID: string;
  existingExpense:any;
  transactionLabel: string;
  categoryProvider: string[] = ["Select Category"]
  expenseDB: any; 
  private _expense: Expense;


  // expenseForm = this.formBuilder.group({
  //   expenseName: ["", Validators.compose([Validators.required, Validators.maxLength(15)])],
  //   expenseCategory:["", Validators.required],
  //   expenseDate: ["", Validators.required],
  //   expenseVal: ["", Validators.compose([Validators.required, Validators.min(0)])],
  //   expenseRemark: [""]
  // })

  constructor(
    private routerExtensions: RouterExtensions,
    private pro: PageRouterOutlet,
    private page: Page,
    private couchService: CouchServiceService,
    // private formBuilder: FormBuilder,
  ) {
   }

  goBack(){
    utils.ad.dismissSoftInput()
    if (this.routerExtensions.canGoBack()){
      this.routerExtensions.back()
    } else {
      this.routerExtensions.navigate(['home'])
    }
  }

  onSubmit(){
    utils.ad.dismissSoftInput()
    // if (this.expenseID==null){
    //   // Add new expense
    //   this.expenseDB.createDocument(this.expense)
    //   // Alert that success
    //   this.routerExtensions.navigate(['./home'])
    //   // console.log(this.expense)
    // } else {
    //   // Edit Expense
    //   this.expenseDB.updateDocument(this.expenseID, this.expense)
    //   // Alert on success
    //   this.routerExtensions.navigate(['./home'])
    // }
  }

  get expense(): Expense{
    return this._expense;
  }

  ngOnInit() {
    // set up expenseDB
    this.expenseDB = this.couchService.getExpenseDB()

    // Detemine if Add Expense or Edit Expense page
    this.expenseID = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.expenseID==null) {
      this.transactionLabel = "Add Expense"
      this._expense = new Expense(null, null, new Date(), null, null)
    } else {
      this.transactionLabel = "Edit Expense"
      this.existingExpense = this.expenseDB.getDocument(this.expenseID)
      // console.log(typeof(this.existingExpense.expenseDate))
      // this._expense = new Expense("Rizman", "Fun", new Date(), 32.5, "Nothing Lol")
      this._expense = new Expense(
        this.existingExpense.expenseName,
        this.existingExpense.expenseCategory,
        this.existingExpense.expenseDate,
        this.existingExpense.expenseVal,
        this.existingExpense.expenseRemark
      )
    }

    // Get the list of categories from list provider
    // this.categoryProvider=this.categoryProvider.concat(['Food','Fun','Fancy'])
    this.categoryProvider = this.categoryProvider.concat(this.couchService.getCategoryList())
    // above is seidp

    if ((this.categoryProvider.length==1) && (this.categoryProvider[0]=='Select Category')){
      // Notify that you need to go to add categories!
      // this.routerExtensions.navigate(['addCategory'])
      this.categoryProvider=this.categoryProvider.concat(['This','Is','An','Error','State'])
    }
  }

  ngOnDestroy() {
    
  }

}
