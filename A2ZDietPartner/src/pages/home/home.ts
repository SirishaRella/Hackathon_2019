import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AngularFireDatabase } from 'angularfire2/database';
import {AboutPage} from "../about/about";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private static userpassword: any;
  private static username: any;
  private checkedValuesArray = [];
  constructor(public navCtrl: NavController,  private fdb: AngularFireDatabase) {

  }

  name:"";
  password:"";
  address:"";
  phno:"";

  // @ts-ignore
  pushData(){
    var jsonData ={
      "name":this.name,
      "password":this.password,
      "address":this.address,
      "Phone-no":this.phno
    };
    firebase.database().ref().push(jsonData).then(function () {
      alert("Succesful! Please login to the application");

    });
    document.getElementById('address').hidden = true;
    document.getElementById('phno').hidden = true;
  }

  loginUser(){
    HomePage.username=this.name;
    HomePage.userpassword=this.password;

    firebase.database().ref().once('value', function(snapshot){
      let resData = snapshot.val();
      let keys = Object.keys(snapshot.val());
      let flag = false;

      for(var i =0;i<keys.length;i++) {
        if(resData[keys[i]].name == HomePage.username && resData[keys[i]].password == HomePage.userpassword){
          var details={
            "data":resData[keys[i]].allergyDetails
          };
          // @ts-ignore
          window.localStorage.setItem("mydata",JSON.stringify(details));
          flag=true;
        }
      }

    if(flag == true){
      alert("Logged in Successfully");
    }
    else{
      alert("Invalid Credentials");
    }

    });
    this.navCtrl.push(AboutPage);
  }

}
