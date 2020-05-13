import { SnackbarService } from './../services/snackbar.service';
import { CouchServiceService } from './../services/couch-service.service';
import { confirm } from 'tns-core-modules/ui/dialogs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { hasKey, getString, setString, remove } from 'tns-core-modules/application-settings';
import { Component, OnInit } from '@angular/core';
import * as utils from "tns-core-modules/utils/utils";


@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  settingForm: FormGroup = this.formBuilder.group({
    currencySymbol: ["", Validators.required]
  })
  constructor(
    private routerExtensions: RouterExtensions,
    private formBuilder: FormBuilder,
    private couchService: CouchServiceService,
    private snackBarService: SnackbarService,
  ) { }

  onDateChanged(args){
    console.dir(Object.keys(args))
    console.log(args)
  }

  updateStartDate(args){
    // console.log(`>>>Start Start : ${args.value}`)
    this.startDate = args.value
  }

  updateEndDate(args){
    // console.log(`>>>End Start : ${args.value}`)
    this.endDate = args.value
    this.endDate.setHours(23)
    this.endDate.setMinutes(59)
    this.endDate.setSeconds(59)
    console.log(this.endDate)
  }

  submitDate(){
    // console.log('sumbit a date')
    if(!this.settingForm.valid){
      alert({
        title: "Currency Prefix Error",
        message: `Please fill in a currency prefix`,
        okButtonText:'OK'
      })
    } else if (this.startDate>this.endDate){
      alert({
        title: "Date Error!",
        message: `Start Date must be before End date`,
        okButtonText:'OK'
      })
    } else {
      // console.log(this.settingForm.get('currencySymbol').value)
      setString('StartDate',this.startDate.toString())
      setString('EndDate',this.endDate.toString())
      setString('currencySym',this.settingForm.get('currencySymbol').value)
      this.snackBarService.showMessage("Settings successfuly saved!", 'white','green')
      this.routerExtensions.navigate(['home'], { clearHistory: true })
    } 
  
  }

  dismissKeyboard(){
    utils.ad.dismissSoftInput()
  }

  goBack() {
    this.routerExtensions.navigate(['home'])
  }

  allDelete(){
    let options={
      title: "Factory Reset",
      message: "This will clear all data from the app.\nAre you sure?",
      okButtonText: "Yes",
      // cancelButtonText: "No",
      neutralButtonText: "Cancel"
    }
    confirm(options).then(result => {
      if (result===true){
        this.couchService.resetDatabases()
        remove('StartDate')
        remove('EndDate')
        remove('currencySym')
        this.snackBarService.showMessage("All data deleted", 'white','red')
        this.routerExtensions.navigate(['home'], { clearHistory: true })
      }
    })
  }

  ngOnInit() {
    if (hasKey('StartDate') && hasKey('EndDate') && hasKey('currencySym')){
      // console.log("has a value!")
      this.startDate = new Date(getString('StartDate'))
      this.endDate = new Date(getString('EndDate'))
      this.settingForm.get('currencySymbol').setValue(getString('currencySym'))
    } else {
      console.log('doesnt have a value')
      this.startDate = new Date()
      this.endDate = new Date()
      this.endDate.setDate(this.endDate.getDate() + 30)
    }
    
  }

}
