import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private checkedValuesArray: any[];
  private acheckedValuesArray: any[];
  private bcheckedValuesArray: any[];

  constructor(public navCtrl: NavController) {

  }

  displayDiet() {
    var xhttp = new XMLHttpRequest();
    var url = "";
    var bfHTML = "";
    var arr=[];
    var arr1=[];
    var arr2=[];
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var jsonData = JSON.parse(this.responseText);
        bfHTML = "<h1>" + jsonData.q + "</h1><img src='" + jsonData.hits[0].recipe.image + "'><h3>" + jsonData.hits[0].recipe.label + "</h3>";
        console.log(JSON.parse(this.responseText));
        document.getElementById('bf').innerHTML = bfHTML;
      }
    };
    // @ts-ignore
    var checkedValues = document.getElementsByClassName('checkboxdata') as HTMLInputElement;
    var checkedValues1 = document.getElementsByClassName('checkboxdata');
    for (var i = 0; i < checkedValues1.length; i++) {
      if (checkedValues[i].checked) {
        arr.push(checkedValues[i].value)
      }
    }
      var length = arr.length;
      var values = arr;
      var urlData = "";
      var url = "";
      for (var i = 0; i < length; i++) {
        urlData += "&healthLabels=" + values[i];
      }
      url = "https://api.edamam.com/search?q=Breakfast&app_id=ace62b9f&app_key=d63b97c069015e1d981f048d2c3eaf27&to=1&diet=balanced" + urlData + "&calories=gte%20600,%20lte%20833";

      xhttp.open("GET", url, true);
      xhttp.send();
      // @ts-ignore
      var acheckedValues = document.getElementsByClassName('checkboxdata') as HTMLInputElement;
      var acheckedValues1 = document.getElementsByClassName('checkboxdata');
      for (var i = 0; i < acheckedValues1.length; i++) {
        if (acheckedValues[i].checked) {
          arr1.push(acheckedValues[i].value);
        }
      }
        var axhttp = new XMLHttpRequest();
        var aurl = "";
        var lunchHTML = "";
        axhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var ajsonData = JSON.parse(this.responseText);
            lunchHTML = "<h1>" + ajsonData.q + "</h1><img src='" + ajsonData.hits[0].recipe.image + "'><h3>" + ajsonData.hits[0].recipe.label + "</h3>";
            console.log(JSON.parse(this.responseText));
            document.getElementById('lunch').innerHTML = lunchHTML;
          }
        };
        var alength = arr1.length;
        var avalues = arr1;
        var aurlData = "";
        var aurl = "";
        for (var i = 0; i < alength; i++) {
          aurlData += "&healthLabels=" + avalues[i];
        }
        aurl = "https://api.edamam.com/search?q=Lunch&app_id=ace62b9f&app_key=d63b97c069015e1d981f048d2c3eaf27&to=1&diet=balanced" + aurlData + "&calories=gte%20600,%20lte%20833";

        axhttp.open("GET", aurl, true);
        axhttp.send();

        // @ts-ignore
        var bcheckedValues = document.getElementsByClassName('checkboxdata') as HTMLInputElement;
        var bcheckedValues1 = document.getElementsByClassName('checkboxdata');
        for (var i = 0; i < bcheckedValues1.length; i++) {
          if (bcheckedValues[i].checked) {
            arr2.push(bcheckedValues[i].value);
          }
        }
          var bxhttp = new XMLHttpRequest();
          var burl = "";
          var dinnerHTML = "";
          bxhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              var bjsonData = JSON.parse(this.responseText);
              dinnerHTML = "<h1>" + bjsonData.q + "</h1><img src='" + bjsonData.hits[0].recipe.image + "'><h3>" + bjsonData.hits[0].recipe.label + "</h3>";
              console.log(JSON.parse(this.responseText));
              document.getElementById('dinner').innerHTML = dinnerHTML;
            }
          };
          var blength = arr2.length;
          var bvalues = arr2;
          var burlData = "";
          var burl = "";
          for (var i = 0; i < blength; i++) {
            burlData += "&healthLabels=" + bvalues[i];
          }
          burl = "https://api.edamam.com/search?q=Dinner&app_id=ace62b9f&app_key=d63b97c069015e1d981f048d2c3eaf27&to=1&diet=balanced" + burlData + "&calories=gte%20600,%20lte%20833";

          bxhttp.open("GET", burl, true);
          bxhttp.send();
        }


}
