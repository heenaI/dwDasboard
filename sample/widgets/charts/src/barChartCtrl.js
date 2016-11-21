'use strict';

angular.module('adf.widget.charts')
  .controller('barChartCtrl', function($scope, urls, config) {
    function countObjectKeys(obj) {
      return Object.keys(obj).length;
    }


    //clean sort data

    if (urls) {
      $scope.series = [];
      if (countObjectKeys(urls)) {
        
        for (var i = 0; i < urls.length; i++) {
          $scope.series.push(_.values(urls[i])[0])
        }
        // console.log(series)
        var keys = _.keys(urls[0])
          // console.log(keys)
        keys = _.without(keys, keys[0])

        var arrangeddata = function(data) {
          var array = _.sortBy(data, function(num) {
            return num;
          });

          if ($scope.config.ascending == true) {
            return array

          } else if ($scope.config.descending == true) {
            return array.reverse()

          } else {
            return data
          }

        }

        var new_data = _.map(keys, function(k) {
          return {
            name: k,
            data: arrangeddata(_.map(urls, k).map(Number)),
            dataLabels: {
              enabled: $scope.config.xAxisLabels,
              inside: true
            }
          };
        });
      }

      var plotLinesData = function() {
        if (typeof($scope.config.plotLineValue) != 'number') {
          return $scope.emptyVar
        } else {
          return $scope.config.plotLineValue
        }
      }

      // create chart
      $scope.chartConfig = {
        xAxis: {
          categories: $scope.series,
          minorTickLength: 0,
          tickLength: 0,
          title: {
            enabled: true,
            text: $scope.config.pathXaxis,
            style: {
              fontWeight: 'normal'
            }
          },
          labels: {
            style: {
              fontSize: '15px',
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          min: 0,
          allowDecimals: false,
          gridLineWidth: 0,
          minorTickLength: 0,
          tickLength: 0,
          title: {
            enabled: true,
            text: $scope.config.pathYaxis,
            style: {
              fontWeight: 'normal'
            }
          },
          labels: {
            enabled: $scope.config.xAxisLabels
          },
          plotLines: [{
            label: {
              text: $scope.config.plotLineLabel,

              rotation: 0,
              style: {
                fontWeight: 'bold'
              }
            },
            color: '#3e3e3e',
            width: 2,
            value: plotLinesData(),
            zIndex: 5,
            dashStyle: 'shortdash'
          }]
        },

        title: {
          text: ' '
        },
        options: {
          chart: {
            type: 'bar',
            backgroundColor: 'none'

          },
          plotOptions: {

          },
          legend: {
            enabled: $scope.config.legend
          }
        },

        series: new_data

      }
    }

    // var chart =  $('#chart1').highcharts();
    // console.log(chart)


  });