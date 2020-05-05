import { getString } from 'tns-core-modules/application-settings';
import { CouchServiceService } from './../services/couch-service.service';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Frame } from 'tns-core-modules/ui/frame/frame';

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
  showPie:boolean = false;
  selectedIndexes = [];
  
  constructor(
    private firestoreservice: FirestoreService,
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
    private frame: Frame,
  ) { }

  getDateString(inputDate: Date) {
    return inputDate.toString()
  }

  editPress(id){
    // console.log(`Edit ${id}`)
    this.routerExtensions.navigate(['editExpense',id])
  }

  deletePress(id){
    let options={
      title: "Delete Expense",
      message: "Are you sure you want to delete the expense?",
    okButtonText: "Yes",
    cancelButtonText: "No",
    neutralButtonText: "Cancel"
    }
    confirm(options).then((result: boolean) => {
      if (result===true) {
        this.couchService.deleteExpense(id)
        this.ngOnInit()
      }
    })
  }



  seriesSelect(args){
    this.selectedIndexes=[args.pointIndex]
  }

  seriesDeselected(args){
    this.selectedIndexes=[]
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
    // this.allCategory = this.couchService.getCategoryDB().query({})
    this.pieValues = this.couchService.getCategoryDB().query({})
    this.categoryList = this.couchService.getCategoryList()
    this.expenses = this.couchService.getExpenses(this.startDate, this.endDate)

    this.pieValues.forEach(pieValue => {
      pieValue['spent']=0;
      pieValue['items']=[];
    }
    )

  
    this.expenses.forEach(expense => {
      let ind = this.pieValues.findIndex( elem => elem['categoryName'] === expense.expenseCategory)
      if (ind === -1) {
        console.log('indexNotFound')
        this.pieValues[this.pieValues.length-1]["spent"] += expense.expenseVal
        
      } else {
        // console.log('indexFound')
        this.pieValues[ind]["spent"] += expense.expenseVal
        this.pieValues[ind]["items"].push(expense)
        this.showPie = true
      }
    })


    this.pieValues = this.pieValues.filter((elem)=>{
      return elem['spent']>0
    })


    if (this.pieValues[this.pieValues.length-1]["spent"] === 0){
      this.pieValues.pop()
    }

  

    
  }
}
