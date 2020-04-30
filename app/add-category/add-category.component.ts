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

  ngOnInit() {
    this.categoryId = this.pro.activatedRoute.snapshot.paramMap.get('id')
    if (this.categoryId==null) {
      this.transactionLabel = "New Category"

    } else {
      // retrieve an old category
      this.transactionLabel = "Edit Category"
    }
  }

}
