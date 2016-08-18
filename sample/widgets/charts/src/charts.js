'use strict';

angular
.module('adf.widget.charts', ['adf.provider', "highcharts-ng"])
.config(RegisterWidgets);

function RegisterWidgets(dashboardProvider) {
  // template object for github widgets
  var widget = {
    reload: true,
    category: 'Charts',
    edit: {
      templateUrl: '{widgetsPath}/github/src/edit.html'
    }
  };

  var commitWidgets = angular.extend({
     resolve: {
        /* @ngInject */
        urls: function(chartService, config){
          if (config.path){
            return chartService.getSpreadsheet(config.path);
          }
        }
      },
  }, widget);

  dashboardProvider
      .widget('piechart', angular.extend({
        title: 'Google Sheet Pie chart',
        description: 'Creates custom Piechart with Google Sheets',
        controller: 'piechartCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets))
      .widget('columnchart', angular.extend({
        title: 'Google Sheet Bar chart',
        description: 'Creates custom bar with Google Sheets',
        controller: 'columnchartCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets))
      .widget('linechart', angular.extend({
        title: 'Google Sheet Line chart',
        description: 'Creates custom line with Google Sheets',
        controller: 'linechartCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets))
      .widget('stacked', angular.extend({
        title: 'Google Sheet stacked bar chart',
        description: 'Creates custom stacked bar chart with Google Sheets',
        controller: 'stackedBarChartCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets))
      .widget('column', angular.extend({
        title: 'Google Sheet column chart',
        description: 'Creates custom column chart with Google Sheets',
        controller: 'columnchartCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets))
      .widget('stacked column', angular.extend({
        title: 'Google Sheet stacked column chart',
        description: 'Creates custom stacked column chart with Google Sheets',
        controller: 'stackedColumnCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets))
      .widget('trendline', angular.extend({
        title: 'Google Sheet trendline chart',
        description: 'Creates custom trendline chart with Google Sheets',
        controller: 'trendlineCtrl',
        templateUrl: '{widgetsPath}/charts/src/view.html'
        }, commitWidgets));
  };
