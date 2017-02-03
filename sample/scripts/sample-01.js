/* *
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

angular.module('sample-01', ['adf', 'LocalStorageModule'])
.controller('sample01Ctrl', function($scope, localStorageService){

  var name = 'sample-01';
  var model = localStorageService.get(name);

  if (!model) {
    // set default model for demo purposes
    model = {
      title: "Deutsche Welle: Wichtige Kennzahlen",
      addTemplateUrl : "partials/custom-dashboard-addwidget.html",
      titleTemplateUrl : "partials/custom-dashboard-title.html",
      editTemplateUrl: "partials/custom-dashboard-edit.html",
      structure: "12/4-4-4",
      rows: [{
        columns: [{
          styleClass: "col-md-4",
          widgets: [{
            type: "Wöchentliche Nutzerkontakte nach TV",
            config: {
              sample: "2016: 66 Mio",
              samplePrefix: "2015: 55 Mio"
              },
            title: "TV nutzerKontakte"
            }, {
            type: "Wöchentliche Nutzerkontakte nach Radio",
            config: {
              sample: "2016: 40 Mio.",
              samplePrefix: "2015: 41 Mio."
            },
            title: "Wöchentliche Nutzerkontakte nach Radio"
          }, {
            type: "Wöchentliche Nutzerkontakte nach soziale Medien",
            config: {
              sample: "2016: 29 Mio.",
              samplePrefix: "2015: 22 Mio."
            },
            title: "Wöchentliche Nutzerkontakte nach soziale Medien"
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

  $scope.$on('adfDashboardChanged', function (event, name, model) {
    localStorageService.set(name, model);
  });
});
