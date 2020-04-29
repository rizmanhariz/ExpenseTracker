import { AddCategoryComponent } from './add-category/add-category.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/addExpense', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addExpense', component: AddExpenseComponent },
  { path: 'editExpense/:id', component: AddExpenseComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'editCategory/:id', component: AddCategoryComponent },
  
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes),
    
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
