import { PageRouterOutlet } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryId;
  transactionLabel:string
  gridRowString: string = "auto";
  imageSource = [
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1",
    "res://test_icon_1"
  ]
  imageAssets=[
  ]
  imageSrc: any;
  isSingleMode: boolean = true;
  thumbSize: number = 80;
  previewSize: number = 300;


  categoryForm: FormGroup = this.formBuilder.group({
    categoryName: ["", Validators.required],
    categoryMaxVal: ["", Validators.required],
    categoryRemark: [""],
    categoryIMG: ["", Validators.required]

  })
  constructor(
    private pro: PageRouterOutlet,
    private formBuilder: FormBuilder
  ) { }

  submitData(){
    console.log(this.categoryForm.get('categoryName').value)
  }

  tapImage(imageInput){
    console.log(imageInput)
  }

  ngOnInit() {
    this.categoryId = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.categoryId==null) {
      this.transactionLabel = "New Category"

    } else {
      // retrieve an old category
      this.transactionLabel = "Edit Category"
    }

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
    console.log(`>>>>gridRowString ${this.gridRowString}`)
    
  }



}
