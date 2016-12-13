'use strict';

angular.module('adf.widget.charts')
  .controller('linechartCtrl', function($scope, urls, config) {
    // console.log(JSON.stringify(urls))
    function countObjectKeys(obj) {
      return Object.keys(obj).length;
    }

    //clean sort data
    function chartType(value) {
      if (value == true) {
        return "areaspline"
      } else {
        return "spline"
      }
    };


    $scope.config.dashStyles = [
      'Solid',
      'ShortDash',
      'ShortDot',
      'ShortDashDot',
      'ShortDashDotDot',
      'Dot',
      'Dash',
      'LongDash',
      'DashDot',
      'LongDashDot',
      'LongDashDotDot'
    ];


    function nFormatter(num, digits) {
      var si = [{
          value: 1E18,
          symbol: "E"
        }, {
          value: 1E15,
          symbol: "P"
        }, {
          value: 1E12,
          symbol: "T"
        }, {
          value: 1E9,
          symbol: "Mrd"
        }, {
          value: 1E6,
          symbol: "Mio"
        }, {
          value: 1E3,
          symbol: "Tsd"
        }],
        rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
        i;
      for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
          return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        }
      }
      return num.toFixed(digits).replace(rx, "$1");
    };

    if (urls) {
      if (countObjectKeys(urls) <= 2) {
        var new_data = urls.map(function(el) {
          return {
            "name": el[Object.keys(el)[0]],
            "value": +el[Object.keys(el)[1]]
          }
        });
      } else if (countObjectKeys(urls) > 2) {

        var series = [];
        for (var i = 0; i < urls.length; i++) {
          series.push(_.values(urls[i])[0])
        }
        // console.log(series)
        var keys = _.keys(urls[0])
          // console.log(keys)
        keys = _.without(keys, keys[0])


        function createZones(value) {
          if (value == undefined) {
            return undefined
          } else {
            return value
          }


        };

        function createColor(value) {
          console.log(typeof(value))
          if (value===undefined) {
            return '#009BFF'
          } else if(value=='') {
            return '#009BFF'
          } else {
            return value
          }
        }

        function chn(value, indexNumber) {
          var index = value.indexOf(indexNumber)
          if (~index) {
            value[index] = {
              y: indexNumber,
              marker: {
                enabled: true,
                radius: 10,
                fillColor: null,
                lineWidth: 7,
                lineColor: 'rgba(192,192,192, .6)'
              }
            }
          }
        }

        function shadeColor2(color, percent) {
          var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
          return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
        }

        var new_data = _.map(keys, function(k) {
          var data = _.map(urls, k).map(Number)

          return {
            name: k,
            data: data,
            zoneAxis: 'y',
            zones: [{
              value: createZones($scope.config.colorupto)
            }, {
              dashStyle: $scope.config.lineStyle,
              color: shadeColor2(createColor($scope.config.seriesColor), 0.6) 
            }],
            color: createColor($scope.config.seriesColor),
            marker: {
              enabled: true,
              radius: 7,
              fillColor: '#fff',
              lineWidth: 3,
              lineColor: null

            },
            dataLabels: {
              enabled: $scope.config.dataLabels,
              connectorColor: 'transparent',
              connectorPadding: 0,
              color: '#000',
              formatter: function() {
                var value = nFormatter(this.y, 1)
                return value

              },
              style: {
                fontWeight: 'bold',
                fontSize: '3em'

              }

            }
          };
        });

      }

      Highcharts.setOptions({
        lang: {
          numericSymbols: [' Tsd', ' Mio', ' Mrd']
        }
      });


      // create chart
      $scope.chartConfig = {
        title: {
          text: ' '
        },
        xAxis: {
          labels: {
            enabled: $scope.config.xAxisLabels,
            formatter: function() {
              return series[this.value];
            },
            style: {
              fontSize: '1.7em',
              fontWeight: 'bold'
            }
          },
          minPadding: 0,
          maxPadding: 0,
          startOnTick: true,
          endOnTick: true,
          minorTickLength: 0,
          tickLength: 0
        },
        yAxis: {
          labels: {
            enabled: $scope.config.yAxisLabels
          },
          gridLineWidth: 0,
          minorTickLength: 0,
          tickLength: 0,
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
            type: chartType($scope.config.fill),
            backgroundColor: 'none',
          },
          plotOptions: {

            line: {
              dataLabels: {
                enabled: true
              }
            },
            series: {
              lineWidth: 5,
              fillOpacity: 0.1
            }

          },
          legend: {
            enabled: $scope.config.legend
          }
        },

        series: new_data

      };


      //create Zones



    }



  });