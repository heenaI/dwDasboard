'use strict';

angular.module('sample', [
    'adf', 'adf.structures.base', 'adf.widget.news', 'adf.widget.weather', 'adf.widget.linklist',
    'adf.widget.github', 'adf.widget.clock', 'LocalStorageModule', 'sample-01', 'sample-02', 'sample-03',
    'sample-04', 'sample-05', 'ngRoute', 'angularScreenfull', 'adf.widget.charts', 'adf.widget.numbers',
    'adf.widget.texteditor', 'ngSanitize', 'adf.widget.timeline', 'adf.widget.quotes', 'colorpicker.module'
  ])
  .config(function(dashboardProvider, $routeProvider, localStorageServiceProvider) {


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

.controller('slideShow', function($scope, $interval) {
  $scope.urls = [{
    'url': '/sample/#/sample/01'
  }, {
    'url': '/sample/#/sample/02'
  }, {
    'url': '/sample/#/sample/03'
  }, {
    'url': '/sample/#/sample/04'
  }, {
    'url': '/sample/#/sample/05'
  }]


  var interval = 7000;


  function getNextUrl() {
    var currentUrl = window.location.pathname + window.location.hash
    for (var i = 0; i <= 4; i++) {
      if ($scope.urls[i].url === currentUrl) {
        if ($scope.urls[i].url != $scope.urls[3].url) {
          return $scope.urls[i + 1].url
        } else if ($scope.urls[i].url == $scope.urls[3].url) {
          return $scope.urls[0].url
        }

      } else if ($scope.urls[i].url != $scope.urls[4].url) {
        console.log('error')
      }

    }

  };

  var changePage;

  $scope.gothroughslides = function() {
    if (angular.isDefined(changePage)) return;
    console.log('starting slide show')
    changePage = $interval(function() {
      var currentLocation = getNextUrl()
      window.location.href = currentLocation
    }, interval)
  };


   var cancelPromise = function() {
    $interval.cancel(changePage);
    changePage = undefined
  }



  $scope.stopSlideShow = function() {

    cancelPromise()
    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      $scope.stopSlideShow()
    });

  };

});