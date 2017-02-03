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
        }, widget))
      .widget('tv', angular.extend({
        title: 'Wöchentliche Nutzerkontakte nach TV',
        description: 'Wöchentliche Nutzerkontakte nach TV DW',
        controller: 'NumberCtrl',
        templateUrl: '{widgetsPath}/numbers/src/tv_nutzerKontakte.html',
        edit: {
          templateUrl: '{widgetsPath}/numbers/src/largeNumedit.html',
          controller: 'NumberCtrl'
          }
        }, widget))
      .widget('radio', angular.extend({
        title: 'Wöchentliche Nutzerkontakte nach Radio',
        description: 'Wöchentliche Nutzerkontakte nach Radio DW',
        controller: 'NumberCtrl',
        templateUrl: '{widgetsPath}/numbers/src/radio_nutzerKontakte.html',
        edit: {
          templateUrl: '{widgetsPath}/numbers/src/largeNumedit.html',
          controller: 'NumberCtrl'
          }
        }, widget))
      .widget('social', angular.extend({
        title: 'Wöchentliche Nutzerkontakte nach soziale Medien',
        description: 'Wöchentliche Nutzerkontakte nach soziale Medien DW',
        controller: 'NumberCtrl',
        templateUrl: '{widgetsPath}/numbers/src/socialmedia.html',
        edit: {
          templateUrl: '{widgetsPath}/numbers/src/largeNumedit.html',
          controller: 'NumberCtrl'
          }
        }, widget));



};

