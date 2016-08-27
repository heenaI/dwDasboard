'use strict';

angular.module('adf.widget.texteditor', ['adf.provider', 'ngQuill'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('texteditor', {
        title: 'Text Editor',
        description: 'This is a text editor widget to create custom text elements for the dashboard',
        templateUrl: '{widgetsPath}/text/src/view.html',
        controller: 'textCtrl',
        edit: {
          templateUrl: '{widgetsPath}/text/src/edit.html',
          controller: 'textCtrl'
        }
      });
  })
  .controller('textCtrl', function($scope, $sce){
    if(!$scope.config.sample){
      $scope.trustedHtml = $sce.trustAsHtml('<ul><li><h2>English</h2></li><li><h2>Kisuaheli</h2></li><li><h2>Arabic</h2></li><li><h2>Haussa</h2></li></ul><p>and there are 26 more langugaes covered by DW</p>')
    } else {
      $scope.trustedHtml = $sce.trustAsHtml($scope.config.sample);
    }



  })
