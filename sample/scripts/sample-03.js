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
  var name = 'MMF';
  var model = localStorageService.get(name);
  if (!model) {
    // set default model for demo purposes

   var model = {
      title: "Customer Service - March 2016",
      addTemplateUrl : "partials/custom-dashboard-addwidget.html",
      titleTemplateUrl : "partials/custom-dashboard-title.html",
      editTemplateUrl: "partials/custom-dashboard-edit.html",
      structure: "Full Page",
      rows: [{
        columns: [{
          styleClass: "col-md-12",
          widgets: [{
            title: 'Wöchentliche Online-Nutzer nach Plattformen',
            type: 'boxy',
            config: {
              path: 'https://docs.google.com/spreadsheets/d/1eRzUr9QktBpl_pS9FPXwqtz1MjvmgLeNh98wZ-ljMjw/pubhtml'
            }
          }]
        }]
      }]
    };
  }
   $scope.name = name;
  $scope.model = model;
  $scope.collapsible = false;
  $scope.maximizable = false;
  $scope.categories = true;

  $scope.$on('adfDashboardChanged', function(event, name, model) {
    localStorageService.set(name, model);
  });
});
