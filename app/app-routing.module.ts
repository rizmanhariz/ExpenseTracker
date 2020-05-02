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
  // { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addExpense', component: AddExpenseComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'editExpense/:id', component: AddExpenseComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'editCategory/:id', component: AddCategoryComponent },
  { path: 'test', component: CouchTestComponent },
  
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes),
    
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
