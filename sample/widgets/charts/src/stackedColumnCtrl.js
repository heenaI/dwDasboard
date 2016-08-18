
  'use strict';

  angular.module('adf.widget.charts')
  .controller('stackedColumnCtrl', function($scope, urls, config) {
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
    tickColor: '#fff',
    categories: series,
    gridLineColor: '#707073',
    labels: {
     style: {
      color: '#E0E0E3'
    }
  },
  lineColor: '#707073',
  minorGridLineColor: '#505053',
  tickColor: '#707073',
  title: {
   style: {
    color: '#A0A0A3'

  }
  }
  },
  yAxis: {
    tickColor: '#fff',
    gridLineColor: '#707073',
    labels: {
     style: {
      color: '#E0E0E3'
    }
  },
  lineColor: '#707073',
  minorGridLineColor: '#505053',
  tickColor: '#707073',
  tickWidth: 1,
  title: {
   style: {
    color: '#A0A0A3'
  }
  },
  min: 0,
  title: {
    text: ' '
  }
  },
  plotLines: [{
    value: 0,
    width: 1,
    color: '#808080'
  }],
  options: {
    chart: {
      type: 'column',
      backgroundColor: 'none'

    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      },
          series: {
           dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          }
          },
        boxplot: {
         fillColor: '#505053'
         },
       candlestick: {
         lineColor: 'white'
         },
       errorbar: {
         color: 'white'
       }

      },
      legend: {
        itemStyle: {
         color: '#E0E0E3'
       },
       itemHoverStyle: {
         color: '#FFF'
       },
       itemHiddenStyle: {
         color: '#606063'
       }
      }},

  series: new_data

  }
  }


  });

