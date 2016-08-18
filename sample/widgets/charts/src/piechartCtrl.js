
'use strict';

angular.module('adf.widget.charts')
  .controller('piechartCtrl', function($scope, urls, config) {
    $scope.data = urls;
    // console.log(urls)

    //cleaning data in a nice form for highcharts!

    if ( urls ){
      var new_data = urls.map(function(el) {
           return {
            "name": el[Object.keys(el)[0]],
            "y": +el[Object.keys(el)[1]],
            sliced: true,
            selected: true
        }
        });

     console.log(JSON.stringify(new_data))

      $scope.chartConfig = {
        options: {
            chart: {
                type: 'pie',
                backgroundColor: 'none'
            },
            plotOptions: {
            pie: {
                allowPointSelect: true,
                slicedOffset: 0,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '2em'
                    }
                }
            }
        }
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

