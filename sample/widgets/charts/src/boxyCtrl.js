'use strict';

angular.module('adf.widget.charts')
  .controller('boxyCtrl', function($scope, urls, config) {
    function countObjectKeys(obj) {
      return Object.keys(obj).length;
    }

    //clean sort data

    if (urls) {


      var categories = []
      var keys = _.keys(urls[0])
      var key = _.without(keys, keys[0])
      var colors = ['#ffc000', '#f08c00', '#dc197d', '#05afe1',
        '#820028', '#002d5a', '#0078c8']

      var getData = _.each(urls, function(value) {
        categories.push(_.values(value)[0])
      });


      function cleanData(data) {
        if (countObjectKeys(data[0]) > 2) {
          var result = _.map(key, function(value) {
            return {
              name: value,
              data: _.map(data, value).map(Number)
            };
          });
          return result
        } else {
          var result = _.map(data, function(num, key) {
            return {
              name: _.values(num)[0],
              data: [parseInt(_.values(num)[1])]
            }
          })
          return result
        }


      }

      var data = cleanData(urls)

      var sum = function() {
        var arr = [];
        var cleanArray = _.pluck(data, 'data');
        for (var i = 0; i < cleanArray.length; i++) {
          arr.push(cleanArray[i][0])
        }
        return arr
      }()

      var total = function(arr){
              var add =  _.reduce(arr, function(memo, num) {
              return memo + num;
            }, 0);
              return add
             }

     var totalofArr = total(sum)



      var avg = _.map(sum, function(num) {
        var sum = (num  / totalofArr)* 100
        return Math.round(sum)
      }).sort(function(a, b) {
        return a - b
      });

      var numberArr = [];
      var category = 0;
      for (var i = 0; i < avg.length; i++) {
        for (var j = 0; j < avg[i]; j++) {
          numberArr.push(category);
        }
        category++;
      }

     



      //add a scenario where when data is like this [{"Plattformen":"DW eigne Angebot",
      //"Online-Nutzer ":"15"},{"Plattformen":"Weitre koopration","Online-Nutzer ":"11"},
      //{"Plattformen":"MSN","Online-Nutzer ":"4"},{"Plattformen":"YouTube","Online-Nutzer ":
      //"4"},{"Plattformen":"Podcasts und Downloads","Online-Nutzer ":"1"},
      //{"Plattformen":"Twitter","Online-Nutzer ":"7"},{"Plattformen":"Facebook",
      //"Online-Nutzer ":"58"}]
      //it still creates a stacked bar chart. The solution could be that if the key/value
      //pairs in an object are 2 or less then then two then change the data structure 


      var ContainerWidth = angular.element(document.querySelector('#mainContainer').offsetWidth);
      var rectWidth = ContainerWidth[0] / 35


      // create chart
      var svgContainer = d3.select("#boxy")

      var rectangle = svgContainer.selectAll("rect")
        .data(numberArr);

      var currentIndex = 0;
      var cumulative = 0;

      //create color scale

      var rectangle = rectangle.enter()
        .append("rect")
        .style("stroke", "#fff")
        .style("fill", function(d) {
          return colors[d];
        })
        .attr("x", function(d, i) {
          return i % 10 * rectWidth
        })
        .attr("y", function(d, i) {
          return Math.floor(i / 10) % 10 * rectWidth + 20
        })
        .attr("width", rectWidth)
        .attr("height", rectWidth);


      var text = svgContainer.selectAll("text")
        .data(data)
        .enter()
        .append("text");

      var shadow = svgContainer.selectAll("text")
        .data(data)
        .enter()
        .append("text");



      var textLabels = text
        .attr("x", function(d) {
          if (d.name == 'MSN') {
            return 100
          } else if (d.name == 'YouTube') {
            return 300
          } else {
            return -100
          }

        })
        .attr("y", function(d) {
          if (d.name == 'Podcasts und Downloads') {
            return 40
          } else if (d.name == 'Twitter') {
            return 90
          } else if (d.name == 'Weitre koopration') {
            return 130
          } else if (d.name == 'DW eigne Angebot') {
            return 180
          } else if (d.name == 'Facebook') {
            return 270
          } else if (d.name == 'MSN') {
            return 18
          } else if (d.name == 'YouTube') {
            return 18
          }
        })
        .text(function(d) {
          return d.name;
        })
        .attr("font-size", "1.5em")
        .attr("font-weight", "bolder")
        .attr("fill", "#000")
        .attr("class", "boxyText");



    }



  });