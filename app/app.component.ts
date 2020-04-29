import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-root',
  // template: `<page-router-outlet></page-router-outlet>`
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private page: Page
  ) {

  }

  ngOnInit(){

  }

}
