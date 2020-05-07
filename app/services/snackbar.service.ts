import { Injectable } from '@angular/core';
import { alert } from "tns-core-modules/ui/dialogs"
import { SnackBar, SnackBarOptions } from "@nstudio/nativescript-snackbar"

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  snackBar = new SnackBar()
  constructor(
    // private snackBar: SnackBar
  ) {
    // this.snackBar = new SnackBar();
   }

   showMessage(inputMessage: string, textColor?, backgrounColor?): void {
     this.snackBar.simple(inputMessage, textColor, backgrounColor)
   }
}
