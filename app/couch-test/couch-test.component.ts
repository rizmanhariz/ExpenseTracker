import { CouchServiceService } from './../services/couch-service.service';
import { Component, OnInit } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';
@Component({
  selector: 'app-couch-test',
  templateUrl: './couch-test.component.html',
  styleUrls: ['./couch-test.component.css']
})
export class CouchTestComponent implements OnInit {
  db: any;
  data = [
    { 
      categoryName: "Rizman",
      date: new Date(2020, 0, 1),
      name: "araki",
      age: 52
    }
  ]
  constructor(
    private couchService: CouchServiceService
  ) { }

  addData(){
    // console.log("Rizzy")
    this.data.forEach(elem => {
      let doc = this.db.createDocument(elem)
      console.log(doc)
    })
    
  }

  retrieveData(){
    console.log('>>>>>>>>>>>>>')
    let results = this.db.query({
      select: [],
      where: [{
        // property:'name', 
        // // comparison:'greaterThan', 
        // comparison:'equalTo', 
        // value: "arakibabi"
        
      }]
    })
    console.log(results)

    // results.forEach(element => {
    //   // this.db.deleteDocument(element.id)
    //   console.log(element)
    // });
  }

  deleteData(){
    // console.log(Object.keys(this.db))
    this.couchService.resetDatabases()
    
  }
  ngOnInit() {
    this.db = this.couchService.getExpenseDB()
  }

}
