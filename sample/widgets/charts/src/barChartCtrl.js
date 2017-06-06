'use strict';

angular.module('adf.widget.charts')
  .controller('barChartCtrl', function($scope, urls, config) {

    function changeColor(item) {
      if (item == undefined) {
        return 0
      } else {
        return item
      }

    }


    function countObjectKeys(obj) {
      return Object.keys(obj).length;
    };


    if (urls) {
      $scope.config.series = [];
      // console.log(series)
      var keys = _.keys(urls[0])
      var key = keys[1]

      keys = _.without(keys, keys[0])

      if ($scope.config.ascending == true) {
        urls.sort(function(obj1, obj2) {
          return obj2[key] - obj1[key];
        })


      } else if ($scope.config.descending == true) {
        urls.sort(function(obj1, obj2) {
          return obj1[key] - obj2[key];
        })

      }

      for (var i = 0; i < urls.length; i++) {
        $scope.config.series.push(_.values(urls[i])[0])
      }



      var new_data = _.map(keys, function(k) {
        return {
          name: k,
          data: _.map(urls, k).map(Number),
          dataLabels: {
            enabled: $scope.config.xAxisLabels,
            inside: true
          },
          borderRadiusTopLeft: 7,
          borderRadiusTopRight: 7
        };
      });

      var plotLinesData = function() {
        if (typeof($scope.config.plotLineValue) != 'number') {
          return $scope.emptyVar
        } else {
          return $scope.config.plotLineValue
        }
      }

      // create chartfunction countObjectKeys(obj) {
      return Object.keys(obj).length;
    };


    //clean sort data

    if (urls) {
      $scope.conf
      $scope.chartConfig = {
        xAxis: {
          categories: $scope.config.series,
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
            bar: {
              zones: [{
                value: changeColor($scope.config.colorupto), // Values up to 10 (not including) ...
                color: $scope.config.color // ... have the color blue.
              }]
            }

          },
          legend: {
            enabled: $scope.config.legend
          }
        },

        series: new_data

      }
    }
    var zones = $scope.chartConfig.options.plotOptions.bar.zones

    function createNewObj() {
       var ind = zones.length +1
       var value = $scope.config.value + ind
       var color = $scope.config.zoneColor + ind

      return {
        value: function(){if(isNaN(value)==true){
          return 0
        } else {
          return value
        }}(), // Values up to 10 (not including) ...
        color:  function(){
          if(isNaN(color)==true){
            return $scope.config.seriesColor
          } else {
            return color
          }
        }()  // ... have the color blue.
      }

    }

    $scope.config.addNewZone = function(){
      
      var newObj = createNewObj()
      zones.push(newObj)
      console.log(zones)
      
    }
    
    
    zones.push({
      color: $scope.config.seriesColor // Values from and including this value have this color 
    })
  


  });