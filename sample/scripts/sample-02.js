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

angular.module('sample-02', ['adf', 'LocalStorageModule'])
.controller('sample02Ctrl', function($scope, localStorageService) {


  var name = 'UBRE';
  var model = localStorageService.get(name);
  if (!model) {
    // set default model for demo purposes

    model = {
      title: "UBRE",
      addTemplateUrl : "partials/custom-dashboard-addwidget.html",
      titleTemplateUrl : "partials/custom-dashboard-title.html",
      editTemplateUrl: "partials/custom-dashboard-edit.html",
      structure: "3-6-3",
      rows: [{
        columns: [{
          styleClass: "col-md-3",
          widgets: [{
            type: "timeline",
            config: {
              sample: '09/24/2016',
              sampleTwo: 'Do MMM YYYY'
            },
            title: "Project Deadline"
          }, {
            type: "stackedcolumn",
            config: {
              path: "https://docs.google.com/spreadsheets/d/1qnnWN88d19Qp9CQqzq7o2pMypTvIIFvTt_DsFslol8w/pubhtml"
            },
            title: "Open Tasks"
          }]
        }, {
          styleClass: "col-md-6",
          widgets: [{
            fullScreen: true,
            modalSize: 'lg',
            type: "linechart",
            config: {
              path: "https://docs.google.com/spreadsheets/d/1PzvEXQ_pHzMvbAyWIQe3BsOGOB1PHltkPouCA0S_2J4/pubhtml"
            },
            title: "Completed Training of DW Employees"
          }, {
            fullScreen: true,
            //modalSize: 'lg',
            type: "texteditor",
            config: {
              sample: "<h1> Missing Features</h1><ul><li>Video Embedding</li><li>Twitter Share</li><li>Headlines</li></ul><br><h1>Project Head: Ruth Kühn - 3333</h1>"
                          },
            title: "Work on new CMS"
          }]
        },
        {
           styleClass: "col-md-3",
        widgets: [{
          type: "largeNumbers",
            config: {
              sample: "130",
              sampleDesc: "Days ago on March 15th 2016"
                          },
            title: "Project Start"

        },{
          type: "largeNumbers",
            config: {
              sample: "15",
              sampleDesc: "3 more people than last week"
                          },
            title: "Staff involved in Project"

        },{
          type: "largeNumbers",
            config: {
              sample: "989",
              sampleDesc: "That looks good. Keep it up :-)"
                          },
            title: "Completed Tasks"

        }]

        }

        ]
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
