'use strict';

angular.module('adf.widget.numbers', ['adf.provider'])
.config(RegisterWidgets);

function RegisterWidgets(dashboardProvider) {
  // template object for github widgets
  var widget = {
    reload: true,
    category: 'Big Numbers',
    description: 'create big numbers for the dashboard'
  };


  dashboardProvider
      .widget('largeNumbers', angular.extend({
        title: 'Large Numbers',
        description: 'Display Large Numbers, dates, currency etc',
        controller: 'NumberCtrl',
        templateUrl: '{widgetsPath}/numbers/src/largeNumview.html',
        edit: {
          templateUrl: '{widgetsPath}/numbers/src/largeNumedit.html',
          controller: 'NumberCtrl'
          }
        }, widget));



};

