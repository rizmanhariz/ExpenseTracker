import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

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

  goHome() {
    this.routerExtensions.navigate(['./home'])
  }

  ngOnInit() {
    console.log(this.title)
    if (this.title == undefined) {
      this.title = "Expense Tracker"
    }
  }

}
