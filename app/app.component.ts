import { RouterExtensions } from 'nativescript-angular/router';
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { setString, getString, hasKey } from 'tns-core-modules/application-settings'
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import * as utils from "tns-core-modules/utils/utils"
import * as app from 'application'
@Component({
  selector: 'app-root',
  // template: `<page-router-outlet></page-router-outlet>`
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  private _sideDrawerTransition: DrawerTransitionBase;
  sideDrawer = <RadSideDrawer>app.getRootView();


  constructor(
    private routerExtensions: RouterExtensions,
    private _changeDetectionRef: ChangeDetectorRef
    // private drawer: RadSideDrawer
    
  ) {
      // Use the component constructor to inject services.
  }

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

  onNavigate(inputText){
    utils.ad.dismissSoftInput()
    this.routerExtensions.navigate([inputText])
    this.drawer.closeDrawer()
    
  }

  ngOnInit(): void {
      this._sideDrawerTransition = new SlideInOnTopTransition();

      if (!hasKey('StartDate')) {
        setString('StartDate', new Date().toString())
      } else {
        // console.log(`>>>Start Date: ${getString('StartDate')}`)
      }

      if (!hasKey('EndDate')) {
        setString('EndDate', new Date(2020,5,5).toString())
      } else {
        // console.log(`>>>End Date: ${getString('EndDate')}`)
      }


      if (!hasKey('currencySym')) {
        setString('currencySym', "RM")
      } else {
        // console.log(`>>>End Date: ${getString('EndDate')}`)
      }


  }

  get sideDrawerTransition(): DrawerTransitionBase {
      return this._sideDrawerTransition;
  }

  ngAfterViewInit() {
    console.log(`This is the file name: ${app.getCssFileName()}`)
    this.drawer= this.drawerComponent.sideDrawer
    // this._changeDetectionRef.detectChanges()
  }

}
