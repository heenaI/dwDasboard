'use strict';

angular.module('sample', [
  'adf', 'adf.structures.base', 'adf.widget.news', 'adf.widget.weather', 'adf.widget.linklist',
  'adf.widget.github', 'adf.widget.clock', 'LocalStorageModule','sample-01', 'sample-02', 'sample-03',
  'sample-04', 'sample-05', 'ngRoute', 'angularScreenfull', 'adf.widget.charts', 'adf.widget.numbers',
  'adf.widget.texteditor', 'ngSanitize', 'adf.widget.timeline', 'adf.widget.quotes'
])
.config(function(dashboardProvider, $routeProvider, localStorageServiceProvider){
 

  dashboardProvider.widgetsPath('widgets/');
  localStorageServiceProvider.setPrefix('adf');
  console.log(localStorageServiceProvider)

  $routeProvider.when('/sample/01', {
    templateUrl: 'partials/sample.html',
    controller: 'sample01Ctrl'
  })
  .when('/sample/02', {
    templateUrl: 'partials/sample.html',
    controller: 'sample02Ctrl'
  })
  .when('/sample/03', {
    templateUrl: 'partials/sample.html',
    controller: 'sample03Ctrl'
  })
  .when('/sample/04', {
    templateUrl: 'partials/sample.html',
    controller: 'sample04Ctrl'
  })
  .when('/sample/05', {
    templateUrl: 'partials/sample5.html',
    controller: 'sample05Ctrl'
  })
  .otherwise({
    redirectTo: '/sample/01'
  });

})
.controller('navigationCtrl', function($scope, $location, $modal){

  $scope.navCollapsed = true;

  $scope.toggleNav = function(){
    $scope.navCollapsed = !$scope.navCollapsed;
  };

  $scope.$on('$routeChangeStart', function() {
    $scope.navCollapsed = true;
  });

  $scope.navClass = function(page) {
    var currentRoute = $location.path().substring(1) || 'Sample 01';
    return page === currentRoute || new RegExp(page).test(currentRoute) ? 'active' : '';
  };

 


});
