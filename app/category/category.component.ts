import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // categoryNames = ['Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz','Rizman', 'Towai', 'Zirz',]
  categoryNames = [
    {name: "rizman", id:'15'},
    {name: "Ventus", id:'15'},
    {name: "Terra", id:'15'},
  ]
  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  newCategory(){
    this.routerExtensions.navigate(['addCategory'])
  }

  editCategory(categoryID): void {
    this.routerExtensions.navigate(['editCategory',categoryID])
  }
  ngOnInit() {
    
  }

}
