
  'use strict';

  angular.module('adf.widget.charts')
  .controller('trendlineCtrl', function($scope, urls, config) {
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
            console.log(urls[0])

            var new_data = _.map(keys, function(k){
                return {name: k,
                        data: _.map(urls, k).map(Number)}

              });

          }


          var first = _.first(new_data)
          first["type"] = "column";
          first["yAxis"] = 1;
          // console.log(JSON.stringify(first))
          // console.log(JSON.stringify( new_data))


  // create chart
  $scope.chartConfig = {
   title: {
    text: ' '
  },
  xAxis: {
    categories: series,
    crosshair: false
  },
  yAxis: [{ // Primary yAxis
            title: {
                text: $scope.config.pathPrimary
            }
        }, { // Secondary yAxis
            title: {
                text: $scope.config.pathSecondary
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },

  title: {
    text: ' '
  },
  options: {
    chart: {
      backgroundColor: 'none'

    }},

  series: new_data

  }
  }


  });

