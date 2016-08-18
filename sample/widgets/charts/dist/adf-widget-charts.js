(function(window, undefined) {'use strict';


angular.module('adf.widget.charts', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('charts', {
        title: 'Charts',
        description: 'This widget adds user generated charting capability to the dashboard. ',
        templateUrl: '{widgetsPath}/charts/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/charts/src/edit.html'
        }
      });
  }]);

angular.module("adf.widget.charts").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/charts/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/charts/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");}]);})(window);