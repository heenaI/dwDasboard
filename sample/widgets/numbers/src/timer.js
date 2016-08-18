'use strict';

angular
.module('adf.widget.numbers')
.controller('TimerCtrl', function($scope, config){

    $scope.daysfromNow= moment(config.sample).fromNow()
    $scope.today = moment().format();
    $scope.compareDate = moment(config.sample).format()

 //change format
    $scope.formats = [{
        "desc": "06.12.16",
        "format": "DD.MM.YY"
      }, {
        "desc": "06/12/16",
        "format": "DD/MM/YY"
      }, {
        "desc": "06-12-16",
        "format": "DD-MM-YY"
      }, {
        "desc": "December 6th 2016",
        "format": "MMMM Do YYYY"
      }, {
        "desc": "6th 12 2016",
        "format": "Do MM YYYY"
      }, {
        "desc": "6th Dec 2016",
        "format": "Do MMM YYYY"
      }, {
        "desc": "Tuesday 6th Dec 2016",
        "format": "dddd Do MMM YYYY"
      }, {
        "desc": "Tue 6th Dec 2016",
        "format": "ddd Do MMM YYYY"
      }]




    $scope.selected = function() {
     return config.sampleTwo
     };
     $scope.format =$scope.selected()
     $scope.dateToDisplay = moment(config.sample).format($scope.format);


//subdate color
    $scope.subColor = function(){
      if($scope.today>$scope.compareDate){
        return '#fd414f'
      } else {
        return '#0396a6'
      }
    }
  });

