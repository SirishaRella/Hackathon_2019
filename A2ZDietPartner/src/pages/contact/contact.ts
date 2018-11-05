import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from  '@angular/common/http';
import * as firebase from "firebase/app";
import { AngularFireDatabase } from 'angularfire2/database';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              private  httpClient : HttpClient) {

  }
  signOut(){
    this.navCtrl.push(HomePage)
  }
  display(){
    var arr=[];
    var result=[];
    // @ts-ignore
    var checkedValues = document.getElementsByClassName('checkboxdata1') as HTMLInputElement;
    var checkedValues1 = document.getElementsByClassName('checkboxdata1');
    for (var i = 0; i < checkedValues1.length; i++) {
      if (checkedValues[i].checked) {
        arr.push(checkedValues[i].value)
      }
    }
    firebase.database().ref().once('value', function(snapshot){
      let resData = snapshot.val();
      let keys = Object.keys(snapshot.val());
      var jsonData={};
      console.log(resData);
      console.log(keys);
      for(var j=0;j<arr.length;j++) {
        for (var i = 0; i < keys.length; i++) {
          if (keys[i] ==arr[j]) {
            jsonData=resData[keys[i]];
            for(var k=1;k<=Object.keys(jsonData).length;k++)
            {
              result.push(jsonData["value"+k]);
            }
          }
        }
      }
      var htmlidhu="";
      htmlidhu+="<h3>Please avoid Drugs with: </h3>"
      for(var p=0;p<result.length;p++){
        htmlidhu+="<ul><li>"+result[p]+"</li></ul>";
      }
      document.getElementById('med').innerHTML=htmlidhu;

    });
  }

  recommendData(){
    var data = document.getElementById("diseases") as HTMLSelectElement;
    var disease = data.options[data.selectedIndex].value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var jsonLength = JSON.parse(this.responseText).Result.Resources.Resource.length;
        var jsonData =JSON.parse(this.responseText);
        var html="";

        for(var i=0;i<jsonLength;i++){
          html+="<ul><li><a href="+jsonData.Result.Resources.Resource[i].AccessibleVersion+">"+jsonData.Result.Resources.Resource[i].Title+"</a></li></ul>"

        }
        document.getElementById("demo").innerHTML = html;
        console.log(JSON.parse(this.responseText).Result.Resources.Resource.length);
        console.log(JSON.parse(this.responseText));
        console.log(JSON.parse(this.responseText).Result.Resources.Resource[0].Title);
      }
    };
    xhttp.open("GET", "https://healthfinder.gov/api/v2/TopicSearch.json?api_key=fvcgdckcmuuebhkq&lang=en&keyword="+disease, true);
    xhttp.send();
  }
}
