'use strict';

angular.module('adf.widget.charts')
  .controller('boxyCtrl', function ($scope, urls, config) {
    console.log(JSON.stringify(urls))
    function countObjectKeys(obj) {
      return Object.keys(obj).length;
    };
    var keys = _.keys(urls[0])
    var key = _.without(keys, keys[0])
    var rearr = urls.sort(function (obj1, obj2) {
      return obj2[key] - obj1[key];
    });
    $scope.style = {
      "height": window.innerHeight * 0.5 + 'px'
    }


    //clean sort data#
    var data = function (data) {
      var values = [];
      var key = _.keys(data[0])[1]


      var misc = {
        name: 'Andere',
        data: data.map(function (value) {
          return Number(Object.values(value)[1])
        }).filter(function (item) {
          return item < 10
        }).reduce(function (acc, item) {
          return acc + item
        })
      };

      var data = data.filter(function (value) {
        return value[key] > 10;
      }).map(function (item, index) {
        return {
          name: _.values(item)[0],
          data: 100-parseFloat(_.values(item)[1])
        }
      });

      data[data.length] = misc
      return data
    }

    $scope.config.datasets = data(rearr)
  })
  .directive('boxyChart', function () {
    return {
      link: link,
      restrict: 'E',
      scope: {
        data: '='
      }
    };

    function link(scope, el, attr) {
      var data = scope.data;
      var ContainerWidth = angular.element(document.querySelector('#mainContainer').offsetWidth);
      var rectWidth = ContainerWidth[0] / 3

      var svg = d3.select(el[0])
        .append('svg')
        .attr('width', rectWidth)
        .attr('height', rectWidth);

      var svgContainer = svg.append('g')
        .attr('class', 'box');


      var circle = svgContainer
        .selectAll('path')
        .data(d3.range(100))
        .enter()
        console.log(data.data)

      var circle = circle
        .append("circle")
        .style("stroke", "#fff")
        .style("fill", function (d, i) {
          return i >= data.data ? '#dc0f6e' : '#95a6b3';
        })
        .attr("cx", function (d, i) {
          return i % 10 * rectWidth / 15 + 15
        })
        .attr("cy", function (d, i) {
          return Math.floor(i / 10) % 10 * rectWidth / 15 + 20
        })
        .attr("r", '0.8em');

      var arr = [];
      for (var i = 0; i < data.data; i++) {
        arr.push(1)
      };




      // var circle2 = svgContainer
      //   .selectAll('path')
      //   .data(arr)
      //   .enter()


      // var circle2 = circle2
      //   .append('circle')
      //   .attr('class', 'circle2')
      //   .style("fill", function (d, i) {
      //     return '#dc0f6e';
      //   })
      //   .attr("cx", function (d, i) {
      //     return i % 10 * rectWidth / 15 + 15
      //   })
      //   .attr("cy", function (d, i) {
      //     return Math.floor(i / 10) % 10 * rectWidth / 15 + 20
      //   })
      //   .attr("r", '0.8em');

      var textContainer = svg.append('g');

      var text = textContainer
        .selectAll('path')
        .data(data.name)
        .enter()

      var text = text
        .append('text')
        .attr('class', 'boxylabels')
        .each(function () {
          var arr = data.name.split(' ');
          var joinedArr = [];
          var acc;

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].length < 3) {
              joinedArr.push(arr[i] + ' ' + arr[i + 1])
              acc = arr[i + 1]
            } 
            else if(arr[i].length>3 && arr[i]!==acc) {
            joinedArr.push(arr[i])
          }
        } 

          for (i = 0; i < joinedArr.length; i++) {
            d3.select(this).append("tspan")
              .text(function () {
                return joinedArr[i]

              })
              .attr("dy", i ? "1.2em" : 0)
              .attr("x", rectWidth / 7)
              .attr("text-anchor", "left")
              .attr("class", "tspan" + i);
          }
        })
        .attr('x', rectWidth / 5)
        .attr('y', rectWidth - 80)
        .attr('font-size', '2em')
        .style("fill", '#3e3e3e')

    };

  });
