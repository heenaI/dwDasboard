
'use strict';

angular.module('adf.widget.charts')
  .controller('onlyTextCtrl', function($scope, urls, config) {
    console.log(JSON.stringify(urls))
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
          var keys = _.keys(urls[0])
          keys = _.without(keys, keys[0])

          var new_data = _.map(keys, function(k){
          return {name: k,
                  data: _.map(urls, k)}
          ;
        });

    }

    console.log(JSON.stringify(new_data))
// create chart
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'column'
            },
             xAxis: {
            categories: keys
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            }
        },
        },
        series: [{
            data: new_data
        }],
        title: {
            text: ''
        }
    }
  }





  });

