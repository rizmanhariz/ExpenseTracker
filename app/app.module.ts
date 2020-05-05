import { CouchServiceService } from './services/couch-service.service';
import { CouchTestComponent } from './couch-test/couch-test.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms'
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { AppRoutingModule } from './app-routing.module';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular"
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular"

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AccordionModule } from 'nativescript-accordion/angular';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      AddExpenseComponent,
      ActionBarComponent,
      AddCategoryComponent,
      CategoryComponent,
      CouchTestComponent,
      AppSettingsComponent
  ],
  imports: [
      NativeScriptModule,
      AppRoutingModule,
      NativeScriptFormsModule,
      NativeScriptUIDataFormModule,
      ReactiveFormsModule,
      NativeScriptUIListViewModule,
      NativeScriptUISideDrawerModule,
      NativeScriptUIChartModule,
      AccordionModule,
  ],
  providers: [
    CouchServiceService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

