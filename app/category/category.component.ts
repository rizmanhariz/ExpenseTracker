import { CouchServiceService } from './../services/couch-service.service';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { confirm } from 'tns-core-modules/ui/dialogs'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // categoryNames = ['Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz',]
  categoryNames:Array<any>;
  categoryDB: any;
  constructor(
    private routerExtensions: RouterExtensions,
    private couchService: CouchServiceService,
  ) { }

  newCategory(){
    this.routerExtensions.navigate(['addCategory'])
  }

  editCategory(categoryID): void {
    this.routerExtensions.navigate(['editCategory',categoryID])
  }

  deleteCategory(categoryID): void{
    let options={
      title: "Delete Category",
      message: "Are you sure you want to delete the Category?",
      okButtonText: "Yes",
      // cancelButtonText: "No",
      neutralButtonText: "Cancel"
    }
    confirm(options).then((result: boolean) => {
      if (result===true) {
        this.couchService.deleteCategory(categoryID)
        this.ngOnInit()
      }
    })
  }

  ngOnInit() {
    this.categoryDB = this.couchService.getCategoryDB()
    this.categoryNames = this.categoryDB.query()
  }

}
