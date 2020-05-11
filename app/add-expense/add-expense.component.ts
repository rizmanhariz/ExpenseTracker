import { SnackbarService } from './../services/snackbar.service';
import { DecimalCurrencyValidator } from './decimalCurrencyValidator';
import { PickerValidator } from './pickerValidator';
import { CouchServiceService } from './../services/couch-service.service';
import { Expense } from './../interfaces/expense';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { RouterExtensions, PageRouterOutlet } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import * as utils from "tns-core-modules/utils/utils"
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { registerElement } from "nativescript-angular/element-registry"
import { NegativeValidator } from './negativeValidator';
// import { RadDataForm } from 'nativescript-ui-dataform';

registerElement("PickerValidator", ()=> <any>PickerValidator)
registerElement("NegativeValidator", ()=> <any>NegativeValidator)
registerElement("DecimalCurrencyValidator", ()=> <any>DecimalCurrencyValidator)

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

  @ViewChild('myExpenseForm', { static: false }) myExpenseForm: RadDataFormComponent;

  constructor(
    private routerExtensions: RouterExtensions,
    private pro: PageRouterOutlet,
    private page: Page,
    private couchService: CouchServiceService,
    private snackBarService: SnackbarService,
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
    let successMessage: string;
    

    // Checks if form is valid before
    this.myExpenseForm.dataForm.validateAll()
    .then(result=>{
      if (result){
        if (this.expenseID==null){
          // Add new expense
          this.expenseDB.createDocument(this.expense)
          // Alert that success
          successMessage = "Added"
          this.routerExtensions.navigate(['./home'], { clearHistory: true })
        } else {
          // Edit Expense
          this.expenseDB.updateDocument(this.expenseID, this.expense)
          // Alert on success
          successMessage = "Edited"
          this.routerExtensions.navigate(['./home'], { clearHistory: true })
        }

        this.snackBarService.showMessage(`Expense ${successMessage}`,'white','#808080')
      }
    })
  }

  get expense(): Expense{
    return this._expense;
  }

  ngOnInit() {
    // Get the list of categories from list provider
    // this.categoryProvider=this.categoryProvider.concat(['Food','Fun','Fancy'])
    this.categoryProvider = this.categoryProvider.concat(this.couchService.getCategoryList())
    // above is seidp

    if ((this.categoryProvider.length==1) && (this.categoryProvider[0]=='Select Category')){
      // Notify that you need to go to add categories!
      this.routerExtensions.navigate(['addCategory'])
      this.snackBarService.showMessage("Please add a category first!","white","red")
      // this.categoryProvider=this.categoryProvider.concat(['This','Is','An','Error','State'])
    }


    // set up expenseDB
    this.expenseDB = this.couchService.getExpenseDB()

    // Detemine if Add Expense or Edit Expense page
    this.expenseID = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.expenseID==null) {
      this.transactionLabel = "Add Expense"
      this._expense = new Expense(null, "Select Category", new Date(), null, null)
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
  }

  ngOnDestroy() {
    
  }

}
