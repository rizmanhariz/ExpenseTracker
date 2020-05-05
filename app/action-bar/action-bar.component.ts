import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "application"

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input('abTitle') title:string
  // title: string = "Rizman"
  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  goNavigate(inputString) {
    this.routerExtensions.navigate([inputString])
  }

  onDrawerButtonTap(){
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();

  }

  // goNavigate(inputString){
  //   this.routerExtensions.navigate([inputString])
  // }

  ngOnInit() {
    if (this.title == undefined) {
      this.title = "Expense Tracker"
    }
  }

}
