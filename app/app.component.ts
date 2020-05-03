import { RouterExtensions } from 'nativescript-angular/router';
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { setString, getString, hasKey } from 'tns-core-modules/application-settings'
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
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
    console.log('>>>>> From system Nav')

    console.log(Object.keys(this.sideDrawerTransition))
    this.routerExtensions.navigate([inputText])
    this.drawer.closeDrawer()
    
  }

  ngOnInit(): void {
      this._sideDrawerTransition = new SlideInOnTopTransition();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
      return this._sideDrawerTransition;
  }

  ngAfterViewInit() {
    this.drawer= this.drawerComponent.sideDrawer
    // this._changeDetectionRef.detectChanges()
  }

}
