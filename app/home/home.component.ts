import { getString, hasKey } from 'tns-core-modules/application-settings';
import { CouchServiceService } from './../services/couch-service.service';
import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Frame, Color } from 'tns-core-modules/ui/frame/frame';
import { confirm } from "tns-core-modules/ui/dialogs";
// import { RadPieChart } from 'nativescript-ui-chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  expenses: any;
  allCategory: any;
  startDate: Date;
  endDate: Date;
  tempData:any;
  pieValues: Array<Object>;
  showPie:boolean = false;
  // App states
  initializeState:boolean;
  emptyCategoryState: boolean;
  emptyExpenseState:boolean;
  emptySettingsState:boolean;

  totalExpenseValue:number;
  currencySym: string = "RM"
  selectedIndexes = [];
  colorList = [
    "#99FF66",
    "#99CC33",
    "#CC9900",
    "#999000",
    "#33FFFF",
    "#FF6600",
    "#330000",
    "#CC9999",
    "#CC0000",
    "#00CCFF",
    "#FF43CC",
    "#6600FF",
    "#3300FF",
    "#00FF33",
    "#CCCCCC",
    "#FFFC00",
    "#CCFFCC",
    "#9999FF",
    "#CC0033",
    "#6600CC",
    "#663300",
    "#FF0000",
  ]
  myColors: Color[];
  
  constructor(
    private firestoreservice: FirestoreService,
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
    private frame: Frame,
    // private ex: RadPieChart
  ) { }

  getDateString(inputDate: Date) {
    return inputDate.toString()
  }

  editPress(id){
    this.routerExtensions.navigate(['editExpense',id])
  }

  deletePress(id){
    let options={
      title: "Delete Expense",
      message: "Are you sure you want to delete the expense?",
    okButtonText: "Yes",
    // cancelButtonText: "No",
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
    args.object.eachChildView((child)=>{
      console.dir(child)
    })
    this.selectedIndexes=[args.pointIndex]
    // this.ex.eachChildView(()=>{
    //   console.log('help!')
    // })
  }

  seriesDeselected(args){
    this.selectedIndexes=[]
  }

  navigateTo(inputRoute:string){
    this.routerExtensions.navigate([inputRoute])
  }

  ngOnInit(){
    this.initializeState = false;

    // Check if appsettings were initialized or not.
    if ( !hasKey('StartDate') || !hasKey('currencySym') || !hasKey('EndDate')) {
      this.initializeState = true;
      this.emptySettingsState = true;
    } else {
      this.startDate = new Date(getString('StartDate'))
      this.endDate = new Date(getString('EndDate'))
      this.currencySym = getString('currencySym')
    }
    
    // Pull all the information needed
    this.pieValues = this.couchService.getCategoryDB().query({})
    this.expenses = this.couchService.getExpenses(this.startDate, this.endDate)

    if (this.pieValues.length === 0) {
      this.initializeState = true
      this.emptyCategoryState = true
    }

    if (this.expenses.length ===0) {
      // this.initializeState = true
      this.emptyExpenseState = true;
    } 

    if (this.initializeState === false){
      // get dates from application settings
      this.startDate = new Date(getString('StartDate'))
      this.endDate = new Date(getString('EndDate'))
      this.currencySym = getString('currencySym')

      this.myColors = []
      // pushes an group for costs with no matching categories
      this.pieValues.push({
        categoryMaxVal:"0.00",
        categoryRemark:"N/A",
        categoryIMG:"res://cat_unknown",
        categoryName: "Others"
      })

      let colorCounter = 0
      this.pieValues.forEach(pieValue => {
        pieValue['spent']=0;
        pieValue['items']=[];
        pieValue['color']=this.colorList[colorCounter]
        this.myColors.push(new Color(this.colorList[colorCounter]))
        colorCounter = colorCounter + 1
      }
      )

      this.expenses.forEach(expense => {
        let ind = this.pieValues.findIndex( elem => elem['categoryName'] === expense.expenseCategory)
        if (ind === -1) {
          console.log('indexNotFound')
          this.pieValues[this.pieValues.length-1]["spent"] += expense.expenseVal
          this.pieValues[this.pieValues.length-1]["items"].push(expense)
          
        } else {
          // console.log('indexFound')
          this.pieValues[ind]["spent"] += expense.expenseVal
          this.pieValues[ind]["items"].push(expense)
        }
      })
  
  
      this.pieValues = this.pieValues.filter((elem)=>{
        return elem['spent']>0
      })

      this.totalExpenseValue=0
      this.pieValues.forEach(elem=>{
        this.totalExpenseValue = this.totalExpenseValue + elem['spent']
      })
  
    }  
  }
}
