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
      $scope.trustedHtml = $sce.trustAsHtml('<h1 style="font-weight:bold;">Deutsch, Englisch, Spanisch, Arabisch</h1>')
    } else {
      $scope.trustedHtml = $sce.trustAsHtml($scope.config.sample);
    }



  })
