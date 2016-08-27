/**
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

angular.module('sample-03', ['adf', 'LocalStorageModule'])
.controller('sample03Ctrl', function($scope, localStorageService) {
  var name = 'Customer Service - March 2016';
  var model = localStorageService.get(name);
  if (!model) {
    // set default model for demo purposes

   var model = {
      title: "Customer Service - March 2016",
      addTemplateUrl : "partials/custom-dashboard-addwidget.html",
      titleTemplateUrl : "partials/custom-dashboard-title.html",
      editTemplateUrl: "partials/custom-dashboard-edit.html",
      structure: "3-6-3",
      rows: [{
        columns: [
        {
          styleClass: "col-md-3",
          widgets: [ {
            title: 'Total Feedback',
            type: 'largeNumbers',
            config: {
              sample: '22000',
              sampleDesc: ' '
            }
          },
          {
            title: 'New Customers',
            type: 'largeNumbers',
            config: {
              sample: '3889',
              sampleDesc: '+ 4% in comparison to Feburary 2016'
            }
          },
          {
            title: 'Total Feedback in March 2016',
            type: 'largeNumbers',
            config: {
              sample: '22000'
            }
          }]
        }, {
          styleClass: "col-md-6",
          widgets: [{
            title: 'Development of Feedback Over Time',
            type: 'linechart',
            config: {
              path: 'https://docs.google.com/spreadsheets/d/1psTcRqz2PEdSW4uB_xg2xPjTevLj2MQFtJyeibrz8U8/pubhtml',
              pathYaxis: 'Number of Entries'
            }
          },
          {
            title: 'Entries According to Categories',
            type: 'columnchart',
            config: {
              path: 'https://docs.google.com/spreadsheets/d/1FkPT5jTLnjmTJV3nz_UDDDOjfjZvkyF99AzchU4bUrw/pubhtml',
              pathYaxis: 'Number of Entries'
            }
          }]
        }, {
          styleClass: "col-md-3",
           widgets: [
            {
            title: 'Complement of the Month',
            type: 'quotes',
            config: {
              sample: "Good Journalism!",
              sampleAuthor: "T. Khan via YouTube"
            }
          },
           {
            title: 'New Customers According to the Language',
            type: 'barchart',
            config: {
              path: 'https://docs.google.com/spreadsheets/d/1elKA1sf3g1gPNYGG9OxtrSEHqS5l1qGVG2Kb2BmIix8/pubhtml',
              pathYaxis: 'Number of Entries'
            }
          }
           ]
        }]
      }]
    };
  }
   $scope.name = name;
  $scope.model = model;
  $scope.collapsible = true;
  $scope.maximizable = true;
  $scope.categories = false;

  $scope.$on('adfDashboardChanged', function(event, name, model) {
    localStorageService.set(name, model);
  });
});
