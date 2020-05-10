import { FireLogInComponent } from './fire-log-in/fire-log-in.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { CouchTestComponent } from './couch-test/couch-test.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: 'logIn', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addExpense', component: AddExpenseComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'editExpense/:id', component: AddExpenseComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'editCategory/:id', component: AddCategoryComponent },
  { path: 'settings', component: AppSettingsComponent },
  { path: 'logIn', component: FireLogInComponent },
  { path: 'test', component: CouchTestComponent },
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes),
    
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
