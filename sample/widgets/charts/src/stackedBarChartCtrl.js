
  'use strict';

  angular.module('adf.widget.charts')
  .controller('stackedBarChartCtrl', function($scope, urls, config) {
    // console.log(JSON.stringify(urls))
    function countObjectKeys(obj) {
     return Object.keys(obj).length;
   }

      //clean sort data

      if(urls){
        if(countObjectKeys(urls)<=2){
          var new_data = urls.map(function(el) {
           return {
            "name": el[Object.keys(el)[0]],
            "value": +el[Object.keys(el)[1]]
          }
        });
        } else if(countObjectKeys(urls)>2){

          var series = [];
          for(var i=0; i<urls.length; i++){
            series.push(_.values(urls[i])[0])
          }
            // console.log(series)
            var keys = _.keys(urls[0])
            // console.log(keys)
            keys = _.without(keys, keys[0])

            var new_data = _.map(keys, function(k){
              return {name: k,
                data: _.map(urls, k).map(Number)}
                ;
              });

          }

          console.log(JSON.stringify(new_data))


  // create chart
  $scope.chartConfig = {
   title: {
    text: ' '
  },
  xAxis: {
    categories: series
  },
  yAxis: {
      min: 0,
       title: {
            enabled: true,
            text: $scope.config.pathYaxis,
            style: {
                fontWeight: 'normal'
            }
        }
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
      series: {
                stacking: 'normal',
                dataLabels: {
                enabled: true
                }
            }
          },
      legend: {
       reversed: true
      }},

  series: new_data

  }
  }


  });

