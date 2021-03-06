import { SnackbarService } from './../services/snackbar.service';
import { CouchServiceService } from './../services/couch-service.service';
import { PageRouterOutlet, RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { Page } from 'tns-core-modules/ui/page/page';
import * as utils from "tns-core-modules/utils/utils"

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  categoryId: string; 
  transactionLabel:string
  isAddTransaction: boolean;
  gridRowString: string = "auto";
  existingCategory: any;
  buttonIsEnabled: boolean = true;
  // to be replaced with something pulled by Service.
  imageSource = [
    "res://cat_icon_01",
    "res://cat_icon_02",
    "res://cat_icon_03",
    "res://cat_icon_04",
    "res://cat_icon_05",
    "res://cat_icon_06",
    "res://cat_icon_07",
    "res://cat_icon_08",
    "res://cat_icon_09",
    "res://cat_icon_10",
    "res://cat_icon_11",
    "res://cat_icon_12",
    "res://cat_icon_13",
    "res://cat_icon_14",
    "res://cat_icon_15",
    "res://cat_icon_16",
    "res://cat_icon_17",
    "res://cat_icon_18",
    "res://cat_icon_19",
    "res://cat_icon_20",
    "res://cat_icon_21",
    "res://cat_icon_22",
    "res://cat_icon_23",
    "res://cat_icon_24",
    "res://cat_icon_25",
    "res://cat_icon_26",
    "res://cat_icon_27",
    "res://cat_icon_28",
    "res://cat_icon_29",
    "res://cat_icon_30",
  ]
  imageAssets=[]
  
  imageSrc: any;
  categoryDB: any;

  // Angular Data form
  categoryForm: FormGroup = this.formBuilder.group({
    categoryName: ["", Validators.compose([Validators.required, Validators.maxLength(15)])],
    // categoryMaxVal: ["", Validators.compose([Validators.required, Validators.min(0)])],
    categoryMaxVal: ["", Validators.min(0)],
    categoryRemark: [""],
    categoryIMG: ["", Validators.required]

  })


  private _selectedItems: string;
  constructor(
    private pro: PageRouterOutlet,
    private formBuilder: FormBuilder,
    private page: Page,
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
    private snackBarService: SnackbarService,
  ) { }

  onTap(){
    utils.ad.dismissSoftInput()
  }

  submitData(){
    // Dismiss any open keyboards
    this.buttonIsEnabled = false;
    utils.ad.dismissSoftInput()

    // Doublechecks Decimal, if user fills decimal last. 
    // if (!this.categoryForm.get('categoryMaxVal').valid){
    //   this.validateDecimal()
    // }

    // Checks form validity
    if (!this.categoryForm.valid) {
      // form is INVALID, raise an ALERT, do nothing.
      alert({
        title: "Missing Details!",
        message: "Please fill all required fields!",
        okButtonText: 'Ok'
      })

    } else {
      // Form is Valid!
      let successMessage: string;

      if (this.isAddTransaction === false) {
        // To edit an existing document
        this.categoryDB.updateDocument(this.categoryId, this.categoryForm.getRawValue())
        // console.log("Updated category")
        successMessage = "Edited"
        this.buttonIsEnabled = true;

        this.goNavigate('home')


      } else if (this.isAddTransaction === true) {
        // To Create a new category

        // Check if name exists
        let categoryExists = this.getCategory(this.categoryForm.get('categoryName').value)
        
        if (!categoryExists) {
          // Creates a new document
          this.categoryDB.createDocument(this.categoryForm.getRawValue())
          successMessage = "Added"
          this.goNavigate('home')

          
        } else {
          // Category already exists, raise ALERT, do nothing.
          alert({
            title: "Duplicate Category!",
            message: "Category name already exists!",
            okButtonText: 'OK'
          })
        } 
      }

      // Sncakbar only raised if successfully added/edited category
      if (successMessage !== undefined) {
        this.snackBarService.showMessage(`Category ${successMessage}`, 'white',"#808080")
      }
      
    }
    this.buttonIsEnabled = true;
  }

  goBack() {
    if (this.routerExtensions.canGoBack()){
      this.routerExtensions.back()
    } else {
      this.goNavigate('home')
    }
  }

  goNavigate(inputString: string){
    this.routerExtensions.navigate([inputString], { clearHistory: true })
  }

  validateDecimal(){
    // Validates the decimal given. Reformats string to remove negatives
    // if Decimal points >2, will reduce to 2
    let currentVal:string = this.categoryForm.get('categoryMaxVal').value;
    let invalid: boolean;
    if (currentVal.startsWith('-')) {
      currentVal = currentVal.substring(1)
      // invalid = true;
    }

    currentVal = parseFloat(currentVal).toFixed(2)
    this.categoryForm.get('categoryMaxVal').setValue(currentVal)
    // if (invalid===true) {this.categoryForm.get('categoryMaxVal').setValue(currentVal)}
  }

  getCategory(inputCategoryName: string){
    let queryResult: Array<Object>= this.categoryDB.query({
      select: [],
      where: [{
        property: 'categoryName',
        comparison: 'equalTo',
        value: inputCategoryName
      }]
    })

    console.log(queryResult.length)

    let returnVal;
    if (queryResult.length === 0) {
      returnVal = null
    } else if (queryResult.length === 1 ){
      returnVal = queryResult[0]
      // delete returnVal.id
    } else {
      // Do do something to delete the older ones? 
      returnVal = queryResult[0]
      // delete returnVal.id
    }

    // console.log(`>>>>> Returning ${returnVal}`)
    return returnVal
  }

  public onItemSelected(args:ListViewEventData){
    utils.ad.dismissSoftInput()
    let imgSrc = this.imageAssets[args.index].image
    this.categoryForm.get('categoryIMG').setValue(imgSrc)
  }

  public onItemDeselected(args: ListViewEventData){
    utils.ad.dismissSoftInput()
    this.categoryForm.get('categoryIMG').setValue("")
  }


  ngOnInit() {
    // sets up DB conections
    this.categoryDB = this.couchService.getCategoryDB()

    
    // Fills imageAssets with objects, DOM only accepts objects.
    for (let listIndex=0; listIndex < this.imageSource.length; listIndex++){
      this.imageAssets.push({
        image: this.imageSource[listIndex]
      })
    }


    // Grid element
    let rowVar = Math.ceil(this.imageSource.length/3)
    for (let i=0; i<rowVar; i++){
      this.gridRowString = this.gridRowString.concat(",auto")
    }
    

    // Determine if to Add Category or Edit Category
    this.categoryId = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.categoryId==null) {
      this.transactionLabel = "New Category"
      this.isAddTransaction = true;

    } else {
      this.transactionLabel = "Edit Category"
      this.isAddTransaction = false;
      
      // Retrieve an old category based on categoryID
      // this.existingCategory = this.getCategory(this.categoryId)
      this.existingCategory = this.categoryDB.getDocument(this.categoryId)
      delete this.existingCategory.id
      this.categoryForm.setValue(this.existingCategory)
    }
    
  }

  ngAfterViewInit(){
    // Existing value is not autopicked when run in ngOnInit. Need to update with a more elegant solution
    if (this.categoryId!=null){
      let imgIndex = this.imageSource.findIndex((elem)=> elem===this.categoryForm.get('categoryIMG').value)
      setTimeout(()=>{
        let myview: RadListView = this.page.getViewById('radListViewItem')
        myview.selectItemAt(imgIndex)
      },100)
    }
  }
}
