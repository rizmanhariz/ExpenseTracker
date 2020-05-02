import { CouchServiceService } from './../services/couch-service.service';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

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
    private couchService: CouchServiceService
  ) { }

  newCategory(){
    this.routerExtensions.navigate(['addCategory'])
  }

  editCategory(categoryID): void {
    this.routerExtensions.navigate(['editCategory',categoryID])
  }
  ngOnInit() {
    this.categoryDB = this.couchService.getCategoryDB()
    this.categoryNames = this.categoryDB.query()
  }

}
