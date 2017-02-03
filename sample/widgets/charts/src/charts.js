'use strict';

angular.module('adf.widget.charts', ['adf.provider', "highcharts-ng"])
  .config(function(dashboardProvider){
    var widget = {
      reload: true,
      category: 'Charts',
      resolve: {
        /* @ngInject */
        urls: function(chartService, config, $scope){
          if (config.path){
            
            return chartService.getSpreadsheet(config.path);
          }
        }
      }

  };

  dashboardProvider
      .widget('piechart', angular.extend({
        title: 'Pie chart',
        description: 'Creates custom Piechart with Google Sheets',
        image: '{widgetsPath}/charts/src/barchartedit.html',
        controller: 'piechartCtrl',
      edit: {
        templateUrl: '{widgetsPath}/charts/src/edit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'

        }, widget))
      .widget('barchart', angular.extend({
        title: 'Bar chart',
        description: 'Creates custom bar with Google Sheets',
        controller: 'barChartCtrl',
      edit: {
        templateUrl: '{widgetsPath}/charts/src/barchartedit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'
        }, widget))
      .widget('linechart', angular.extend({
        title: 'Line chart',
        description: 'Creates custom line with Google Sheets',
        image: '{widgetsPath}/charts/src/line-chart-with-markers-icon-69543.png',
        controller: 'linechartCtrl',
      edit: {
        templateUrl: '{widgetsPath}/charts/src/linechartEdit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'
        }, widget))
      .widget('stackedbarChart', angular.extend({
        title: 'Stacked bar chart',
        description: 'Creates custom stacked bar chart with Google Sheets',
        controller: 'stackedBarChartCtrl',
      edit: {
        templateUrl: '{widgetsPath}/charts/src/edit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'
        }, widget))
      .widget('columnchart', angular.extend({
        title: 'Column chart',
        description: 'Creates custom column chart with Google Sheets',
        controller: 'columnchartCtrl',
      edit: {
        templateUrl: '{widgetsPath}/charts/src/edit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'
        }, widget))
      .widget('stackedcolumn', angular.extend({
        title: 'Stacked column chart',
        description: 'Creates custom stacked column chart with Google Sheets',
        controller: 'stackedColumnCtrl',
      edit: {
        templateUrl: '{widgetsPath}/charts/src/edit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'
        }, widget))
      .widget('trendline', angular.extend({
        title: 'Double Axis chart',
        description: 'Creates custom trendline chart with Google Sheets',
        controller: 'trendlineCtrl',
        edit: {
        templateUrl: '{widgetsPath}/charts/src/doubleAxisedit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/view.html'
        }, widget))
      .widget('boxy', angular.extend({
        title: 'Boxy',
        description: 'Creates a Boxy chart',
        controller: 'boxyCtrl',
        edit: {
        templateUrl: '{widgetsPath}/charts/src/edit.html'
      },
      templateUrl: '{widgetsPath}/charts/src/boxyview.html',
        }, widget));
  });
