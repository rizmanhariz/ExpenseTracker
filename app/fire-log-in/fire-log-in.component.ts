import { FirestoreService } from './../services/firestore.service';
import { SnackbarService } from './../services/snackbar.service';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { confirm,prompt, PromptResult, PromptOptions,inputType,capitalizationType } from "tns-core-modules/ui/dialogs";
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
  inProcessing: boolean = false;
  
  @ViewChild('myLogInForm', { static: false }) myLogInForm: RadDataFormComponent;


  constructor(
    private routerExtension: RouterExtensions,
    private snackBarService: SnackbarService,
    private firestoreService : FirestoreService,
    private page: Page,
  ) { }

  toggleBusy(){
    this.inProcessing = !this.inProcessing
  }


  navigateTo(inputString: string){
    this.routerExtension.navigate([inputString], { clearHistory: true })
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
      this.toggleBusy()
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
      this.toggleBusy()
      this.snackBarService.showMessage("Successfully logged in",'white','green')
      this.clearInputs()

    })
    .catch(err=>{
      console.dir(err)
      this.toggleBusy()
      if (err.code){
        this.snackBarService.showMessage("Email & password combination not found", 'white','red')
      }
    })
  }

  logOut(){
    this.user.signOut()
  }

  createUser(){
    this.user.createUserWithEmailAndPassword(this.logInCreds.email,this.logInCreds.password)
    .then(res=>{
      this.logIn()
    })
    .catch((err)=>{
      console.log(err)
      this.toggleBusy()
      if (err.includes("The email address is already in use by another account")){
        this.snackBarService.showMessage("Email address is already registered", 'white','red')
      } else {
        this.snackBarService.showMessage(err, 'white','red')
      }
    })
  }

  forgotPass(){
      let options: PromptOptions = {
        title: "Reset Password",
        // defaultText: " Please enter your email address",
        message: "Please enter your email address",
        okButtonText: "OK",
        cancelButtonText: "Cancel",
        // neutralButtonText: "Neutral",
        cancelable: true,
        inputType: inputType.email, // email, number, text, password, or email
        capitalizationType: capitalizationType.none // all. none, sentences or words
    };
    
    prompt(options).then((result: PromptResult) => {
      if (result.result===true){
        if (result.text!==""){
          this.toggleBusy()
          this.user.sendPasswordResetEmail(result.text)
          .then(()=>{
            this.toggleBusy()
            this.snackBarService.showMessage("Password reset email sent",'white','blue')
          })
          .catch(err=>{
            this.toggleBusy()
            this.snackBarService.showMessage(err,'white','red')
          })

        }
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
        this.toggleBusy()
        this.firestoreService.backupFirebase(this.user.currentUser.uid)
        .then((ret)=>{
          if (ret===true){
            this.toggleBusy()
            this.snackBarService.showMessage("Data has been successfully backed up!",'white','green')
            
          }
        })
        .catch(err=>{
          this.toggleBusy()
          this.snackBarService.showMessage("Error! Please try again later", "white","red")
          
        })
        // this.firestoreService.deleteFirebaseData(this.user.currentUser.uid)
        

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
        this.toggleBusy()
        // this.firestoreService.deleteFirebaseData(this.user.currentUser.uid)
        // this.firestoreService.retrieveFirebaseData(this.user.currentUser.uid)
        this.firestoreService.restorefromFirebase(this.user.currentUser.uid)
        .then(ret=>{
          this.toggleBusy()
          if (ret===true){
            this.snackBarService.showMessage("Data has been successfully backed up!",'white','green')
          } else {
            this.snackBarService.showMessage("Some error happened! Please try again",'white','red')
          }
        })
        .catch(err=>{
          this.toggleBusy()
          this.inProcessing=false
          this.snackBarService.showMessage("Some error happened! Please try again",'white','red')  
        })
        
        
      }
    })
  }

  ngOnInit() {
    // console.dir(this.user)
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
