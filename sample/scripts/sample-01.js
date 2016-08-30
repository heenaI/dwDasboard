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
      title: "Willkommen bei der Deutsche Welle",
      addTemplateUrl : "partials/custom-dashboard-addwidget.html",
      titleTemplateUrl : "partials/custom-dashboard-title.html",
      editTemplateUrl: "partials/custom-dashboard-edit.html",
      structure: "3-6-3",
      rows: [{
        columns: [{
          styleClass: "col-md-3",
          widgets: [{
            type: "largeNumbers",
            config: {
              sample: "135000000",
              samplePostfix: "Benutzer pro Woche",
              sampleDesc: "+17 Mio. im Vergleich zu 2015"
              },
            title: "Gesamtzahl Nutzer pro Woche"
            }, {
            type: "largeNumbers",
            config: {
              sample: "66000000",
              samplePostfix: "Benutzer pro Woche",
              sampleDesc: "+11 Mio. im Vergleich zu 2015"
            },
            title: "Gesamtzahl TV Nutzer pro Woche"
          }, {
            type: "largeNumbers",
            config: {
              sample: "40000000",
              sampleDesc: "Vor allem die Sprachen: Haussa + Kisuaheli"
            },
            title: "Gesamtzahl Radionutzer pro Woche"
          }, {
            type: "largeNumbers",
            config: {
              sample: "29000000",
              sampleDesc: "Über Internet: DW App und Social Media"
            },
            title: "Gesamtzahl der Digitalnutzer pro Woche"
          }]
        },
        {
          styleClass: "col-md-6",
           widgets: [{
            fullScreen: false,
            modalSize: 'lg',
            type: "barchart",
            config: {
               path: "https://docs.google.com/spreadsheets/d/1fPvHFLqi9s6gngi-KpqTXQNQUFSpQWRT0XFvdKMlbyA/pubhtml"
            },
            title: "DW users around the world in Percent"
          }, {
            fullScreen: false,
            modalSize: 'lg',
            type: "barchart",
            config: {
               path: "https://docs.google.com/spreadsheets/d/17u3kEyPjBg3mvdR-tfr7beQbePwzoQFGij8s-Lc8kps/pubhtml"
            },
            title: "Zahl der Mitarbeiter an den Standorten Bonn und Berlin"

           }]
        },
        {
          styleClass: "col-md-3",
           widgets: [{
            type: "largeNumbers",
            config: {
              sampleThree: "Englisch",
              sample: "30000000",
              samplePostfix: "Nutzer pro Woche"
              },
            title: "Erfolgreichste Sprache"
            },{
            type: "largeNumbers",
            config: {
              sampleThree: "Arabisch",
              sample: "+ 50%",
              samplePostfix: "Nutzer pro Woche",
              sampleDesc: "im Vergleich zum Vorjahr"
              },
            title: "Stärkste Wachstum"
            }, {
            type: "news",

            config: {
               url: "http://rss.dw.com/rdf/rss-en-all"
            },
            title: "Top News"

          }]
        }

          ]

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
