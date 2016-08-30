'use strict';

angular
.module('adf.widget.numbers')
.controller('NumberCtrl', function($scope, config, $filter){

  $scope.selectType = ['Abbreviated Large Number', 'Percentage', 'Bytes']
  $scope.message = 'please select Number'
  $scope.alert = 'info'

  $scope.selected = function() {
    if(typeof config.sampleTwo !== 'Number'){

    } else {
     return config.sampleTwo
     };
   }

  $scope.selectedType = $scope.selected()

 $scope.sendSelectedItem = function(){
   if($scope.selectedType == "Abbreviated Large Number"){
    return $filter('largeNumber')(0)
  }

 }


});
