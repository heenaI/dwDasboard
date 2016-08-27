'use strict';

angular.module('adf.widget.quotes', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('quotes', {
        title: 'Quotes',
        description: 'this widget creats quoted bold text',
        templateUrl: '{widgetsPath}/quotes/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/quotes/src/edit.html'
        }
      });
  });
