import { RouterExtensions } from 'nativescript-angular/router';
import { hasKey, getString, setString } from 'tns-core-modules/application-settings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  startDate: Date
  endDate: Date
  constructor(
    private routerExtensions: RouterExtensions,
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
    if (this.startDate<this.endDate) {
      setString('StartDate',this.startDate.toString())
      setString('EndDate',this.endDate.toString())
      this.routerExtensions.navigate(['home'])
    } else {
      alert({
        title: "Date Error!",
        message: `Start Date must be before End date`,
        okButtonText:'OK'
      })
    }
  }

  goBack() {
    this.routerExtensions.back()
  }

  ngOnInit() {
    this.startDate = new Date(getString('StartDate'))
    this.endDate = new Date(getString('EndDate'))

    // console.log(`>>>Start Date: ${this.startDate}`)
    // console.log(`>>>End Date: ${this.endDate}`)

    // this.endDate.getMonth
    // this.endDate.getDate
  }

}
