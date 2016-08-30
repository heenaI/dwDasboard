
  'use strict';

  angular.module('adf.widget.charts')
  .controller('barChartCtrl', function($scope, urls, config) {
    function countObjectKeys(obj) {
     return Object.keys(obj).length;
   }

      //clean sort data

      if(urls){
        if(countObjectKeys(urls)){
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
    categories: series,
      title: {
            enabled: true,
            text: $scope.config.pathXaxis,
            style: {
                fontWeight: 'normal'
            }
        },
        labels: {
                style: {
                    fontSize:'15px',
                    fontWeight: 'bold'
                }
            }
  },
  yAxis: {
      allowDecimals: false,
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
          },
      legend: {
       reversed: true
      }},

  series: new_data

  }
  }


  });

