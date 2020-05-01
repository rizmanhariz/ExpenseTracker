import { PageRouterOutlet, RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { Page } from 'tns-core-modules/ui/page/page';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  categoryId;
  transactionLabel:string
  gridRowString: string = "auto";
  // to be replaced with something pulled by Service.
  imageSource = [
    "res://test_icon_1",
    "res://test_icon_2",
  ]
  imageAssets=[
  ]
  imageSrc: any;


  // Angular Data form
  categoryForm: FormGroup = this.formBuilder.group({
    categoryName: ["", Validators.compose([Validators.required, Validators.maxLength(15)])],
    categoryMaxVal: ["", Validators.compose([Validators.required, Validators.min(0)])],
    categoryRemark: [""],
    categoryIMG: ["", Validators.required]

  })


  private _selectedItems: string;
  constructor(
    private pro: PageRouterOutlet,
    private formBuilder: FormBuilder,
    private page: Page,
    private routerExtensions: RouterExtensions,
  ) { }

  submitData(){
    (console.log(this.categoryForm.getRawValue()))
    if (!this.categoryForm.get('categoryMaxVal').valid){
      this.validateDecimal()
    }


    if (this.categoryForm.valid) {
      console.log('TRUE')
    } else {
      alert({
        title: "Missing Details!",
        message: "Please fill all required fields!",
        okButtonText: 'Ok'
      })
    }
    



  }

  goBack() {
    if (this.routerExtensions.canGoBack()){
      this.routerExtensions.back()
    } else {
      this.routerExtensions.navigate(['home'])
    }
  }

  validateDecimal(){
    let currentVal:string = this.categoryForm.get('categoryMaxVal').value;
    console.log(currentVal)
    let invalid: boolean;
    if (currentVal.startsWith('-')) {
      currentVal = currentVal.substring(1)
      invalid = true;
    }

    if (currentVal.includes('.')){
      let tempDecimal = currentVal.split('.')
      if (tempDecimal[1].length>2){
        tempDecimal[1] = tempDecimal[1].slice(0,2)
        currentVal = tempDecimal.join(".")
        invalid = true
      }
    }

    if (invalid===true) {this.categoryForm.get('categoryMaxVal').setValue(currentVal)}
  }

  public onItemSelected(args:ListViewEventData){
    let imgSrc = this.imageAssets[args.index].image
    this.categoryForm.get('categoryIMG').setValue(imgSrc)
  }


  ngOnInit() {
    let rowVar = 0;
    let colVar = 0;

    for (let listIndex=0; listIndex < this.imageSource.length; listIndex++){
      this.imageAssets.push({
        image: this.imageSource[listIndex],
        row: rowVar.toString(),
        col: colVar.toString()
      })

      colVar ++;
      if ( colVar == 4) {
        rowVar ++;
        colVar = 0;
      }
    }

    for (let i=0; i<rowVar; i++){
      this.gridRowString = this.gridRowString.concat(",auto")
    }
    

    this.categoryId = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.categoryId==null) {
      this.transactionLabel = "New Category"

    } else {
      // retrieve an old category based on categoryID
      this.transactionLabel = "Edit Category"
      this.categoryForm.setValue({
        categoryName: "Food",
        categoryMaxVal: "32.5",
        categoryRemark: "",
        categoryIMG: "res://test_icon_2"
      })
    }
    
  }

  ngAfterViewInit(){
    console.log(">>Running ngAfterViewInit")
    if (this.categoryId!=null){
      let imgIndex = this.imageSource.findIndex((elem)=> elem===this.categoryForm.get('categoryIMG').value)
      setTimeout(()=>{
        let myview: RadListView = this.page.getViewById('radListViewItem')
        myview.selectItemAt(imgIndex)
      },100)
    }
  }
}
