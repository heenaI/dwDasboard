'use strict';

angular.module('adf.widget.charts')
  .controller('stackedColumnCtrl', function($scope, urls, config) {
    // console.log(JSON.stringify(urls))
    function countObjectKeys(obj) {
      return Object.keys(obj).length;
    }

    //clean sort data

    if (urls) {


      var categories = []
      var keys = _.keys(urls[0])
      var key = _.without(keys, keys[0])
  

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

      //add a scenario where when data is like this [{"Plattformen":"DW eigne Angebot",
      //"Online-Nutzer ":"15"},{"Plattformen":"Weitre koopration","Online-Nutzer ":"11"},
      //{"Plattformen":"MSN","Online-Nutzer ":"4"},{"Plattformen":"YouTube","Online-Nutzer ":
      //"4"},{"Plattformen":"Podcasts und Downloads","Online-Nutzer ":"1"},
      //{"Plattformen":"Twitter","Online-Nutzer ":"7"},{"Plattformen":"Facebook",
      //"Online-Nutzer ":"58"}]
      //it still creates a stacked bar chart. The solution could be that if the key/value
      //pairs in an object are 2 or less then then two then change the data structure 


      console.log(JSON.stringify(data))


      // create chart
      $scope.chartConfig = {
        title: {
          text: ' '
        },
        xAxis: {
          tickColor: '#fff',
          categories: categories,
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
            },
            title: {
              enabled: true,
              text: $scope.config.pathYaxis,
              style: {
                fontWeight: 'normal'
              }
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
              stacking: 'percent',
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
          }
        },

        series: data

      }
    }


  });