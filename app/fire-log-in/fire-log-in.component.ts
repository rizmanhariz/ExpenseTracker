import { FirestoreService } from './../services/firestore.service';
import { SnackbarService } from './../services/snackbar.service';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { confirm } from "tns-core-modules/ui/dialogs";
import * as utils from "tns-core-modules/utils/utils"
import { Page } from 'tns-core-modules/ui/page/page';
const firebase = require("nativescript-plugin-firebase/app")

@Component({
  selector: 'app-fire-log-in',
  templateUrl: './fire-log-in.component.html',
  styleUrls: ['./fire-log-in.component.css']
})
export class FireLogInComponent implements OnInit, OnDestroy {
  user = firebase.auth()
  loggedIn: boolean = false;
  logInPage: boolean = true;
  toggleLabel: string = "Register a new Account";
  logInCreds: any;
  
  @ViewChild('myLogInForm', { static: false }) myLogInForm: RadDataFormComponent;


  constructor(
    private routerExtension: RouterExtensions,
    private snackBarService: SnackbarService,
    private firestoreService : FirestoreService,
    private page: Page,
  ) { }


  navigateTo(inputString: string){
    this.routerExtension.navigate([inputString])
  }

  clearInputs(){
    this.logInCreds = {
      email: null,
      password: null
    }
  }

  submitData(){
    utils.ad.dismissSoftInput()
    if (this.myLogInForm.dataForm.validateAll()){
      if (this.logInPage){  
        this.logIn()
      } else {
        this.createUser()
      }
    }
  }

  toggleType(){
    // Clear inputs
    this.clearInputs()
    this.logInPage = !this.logInPage
    if (this.logInPage) {
      this.toggleLabel = "Register a new Account"
    } else {
      this.toggleLabel = "Sign in to existing account"
    }
  }
  
  logIn() {
    // Get username & password
    this.user.signInWithEmailAndPassword(this.logInCreds.email, this.logInCreds.password)
    .then(res=>{
      // Do what you need to do :)
      this.clearInputs()

    })
    .catch(err=>{
      console.dir(err)
      if (err.code){
        this.snackBarService.showMessage("Email & password combination not found", 'white','red')
      }
    })
  }

  logOut(){
    this.user.signOut()
  }

  currentUser(){
    console.log(this.user)
  }

  createUser(){
    this.user.createUserWithEmailAndPassword(this.logInCreds.email,this.logInCreds.password)
    .then(res=>{
      this.logIn()
    })
    .catch((err)=>{
      console.log(err)
      if (err.includes("The email address is already in use by another account")){
        this.snackBarService.showMessage("Email address is already registered", 'white','red')
      }
    })
  }

  firestoreBackup(){
    let options= {
      title: "Backup all data",
      message: "Are you sure you wish to backup all the data?",
      okButtonText: "Yes",
      cancelButtonText: "No"
    }
    confirm(options)
    .then((result:boolean)=>{
      if (result===true){
        console.log(this.user.currentUser.uid)
        this.firestoreService.addFirebaseData(this.user.currentUser.uid)
      }
    })
  }

  firestoreRestore(){
    let options= {
      title: "Restore data from cloud",
      message: "Are you sure ?\nThis will replace all your current data",
      okButtonText: "Yes",
      cancelButtonText: "No"
    }
    confirm(options)
    .then((result:boolean)=>{
      if (result===true){
        // this.firestoreService.deleteFirebaseData(this.user.currentUser.uid)
        this.firestoreService.retrieveFirebaseData(this.user.currentUser.uid)
        // console.log(this.user.currentUser.uid)
      }
    })
  }

  ngOnInit() {
    this.logOut()
    this.clearInputs()

    this.user.onAuthStateChanged((user?)=>{
      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    })
  }

  ngOnDestroy() {

  }

}
