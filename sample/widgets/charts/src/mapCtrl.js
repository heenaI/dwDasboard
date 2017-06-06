'use strict';

angular.module('adf.widget.charts')
  .controller('mapCtrl', function ($scope, urls, config) {


    //starting map
    var margin = {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10
      },
      width = parseInt(d3.select('#map').style('width')),
      width = width - margin.left - margin.right,
      mapRatio = .5,
      height = width * mapRatio;

    //Map projection
    var projection = d3.geo.equirectangular()
      .scale(width / 5.8)
      .translate([width / 2, height / 2]) //translate to center the map in view

    //Generate paths based on projection
    var path = d3.geo.path()
      .projection(projection);

    //Create an SVG
    var svg = d3.select("#map")
      .append("svg")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin");

    //Group for the map features
    var features = svg.append("g")
      .attr("class", "features");

    d3.json("widgets/charts/src/countries.topojson", function (error, geodata) {
      if (error) return console.log(error); //unknown error, check the console

      var layerOne = svg.append("g");
      var layerTwo = svg.append("g");
      var layerThree = svg.append("g");
      var layerFour = svg.append("g");

      //Create a path for each map feature in the data
      features.selectAll("path")
        .data(topojson.feature(geodata, geodata.objects.subunits).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d", path)
        .on("click", clicked)
        .style('fill', '#cdd5db')
        .style('stroke', '#ffffff')
        .style('stroke-width', '0.5px')
        .on('mouseover', function (d, i) {
          d3.select(this).style('stroke-width', '2px');
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('stroke-width', '0.5px');
        });

      // create pies
      // var colorsScale1 = ['#3e3e3e', '#95a6b2']
      // var colorScaleAfrika = ['#dc0f6e', '#ed87b6']
      // var metorScale = d3.scale.pow().domain([0, 300]);

      // var pie = layerOne
      //   .selectAll('.pie')
      //   .data(urls);

      // var pies = pie.enter()
      //   .append('g')
      //   .attr('class', '.pie')
      //   .attr("fill", "red")
      //   .attr("transform", function (d) {
      //     return "translate(" + projection([d.lon, d.lat])[0] + "," + projection([d.lon, d.lat])[1] + ")";
      //   })
      //   .attr("id", function (d) {
      //     return d.wor
      //   });

      // var pieData = d3.layout.pie()
      //   .value(function (d) {
      //     return d
      //   })
      //   .sort(null);

      //  var arc = d3.svg.arc()
      //   .outerRadius(function (d, i) {
      //     return 70
      //   })
      //   .innerRadius(40)

      // var g = pies.selectAll('.slice')
      //   .data(function (d) {
      //     var piesize = d.number * 2
      //     d.pieSize = piesize
      //     return pieData([d.number, d.number2]);
      //   });

      // g.enter().append('g') // create g elements inside each pie
      //   .attr('class', 'arc')

     


      // g.append('path')
      //   .attr('d', arc)
      //   .style('fill', function (d, i) {
      //     if (d.data > 50) {
      //       return colorScaleAfrika[i]
      //     } else {
      //       return colorsScale1[i]
      //     }
      //   });











      var pies = layerOne.attr("class", "pie")
        .selectAll("circle")
        .data(urls)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
          return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function (d, i) {
          return projection([d.lon, d.lat])[1];
        })
        .attr("r", function (d) {
          if (width >= 1000) {
            return (d.number) * 2
          } else {
            return d.number
          }

        })
        .style('fill', function (d) {
          if (d.wor == 'Afrika') {
            return '#dc0f6e'
          } else {
            return '#3e3e3e'
          }
        });



      var text = layerTwo
        .attr('class', 'text')
        .selectAll('text')
        .data(urls)
        .enter()
        .append('text')
        .attr('x', function (d, i) {
          if (d.wor == 'Nordmerika' || d.wor == 'Latinamerika') {
            return projection([d.lon, d.lat])[0] - 60
          } else if (d.wor == 'Afrika') {
            return projection([d.lon, d.lat])[0] + 200
          } else if (d.wor == 'Asien') {
            return projection([d.lon, d.lat])[0] + 130
          } else if (d.wor == 'GUS | Russland') {
            return projection([d.lon, d.lat])[0] + 30
          } else if (d.wor == 'Europa | MSOE') {
            return projection([d.lon, d.lat])[0] - 100
          }

        })
        .attr('y', function (d, i) {
          if (d.wor == 'Nordmerika' || d.wor == 'Latinamerika') {
            return projection([d.lon, d.lat])[1] + 50
          } else if (d.wor == 'Afrika') {
            return projection([d.lon, d.lat])[1] + 50
          } else if (d.wor == 'Asien') {
            return projection([d.lon, d.lat])[1] + 60
          } else if (d.wor == 'GUS | Russland') {
            return projection([d.lon, d.lat])[1] - 60
          } else if (d.wor == 'Europa | MSOE') {
            return projection([d.lon, d.lat])[1]
          }
        })
        .text(function (d) {
          return d.number;
        })
        .attr("text-anchor", "middle")
        .style('fill', '#3e3e3e')
        .style('font-weight', 'bold')
        .style('font-size', '3em')
        .style('text-decoration', 'underline');

      var labelWidths = [];
      var labels = layerThree
        .attr('class', 'labels')
        .selectAll('text')
        .data(urls)
        .enter()
        .append('text')
        .text(function (d) {
          return d.wor;
        })
        .attr('x', function (d, i) {
          labelWidths.push(this.getBBox().width)
          if (d.wor == 'Nordmerika' || d.wor == 'Latinamerika') {
            return projection([d.lon, d.lat])[0] - 250
          } else if (d.wor == 'Afrika') {
            return projection([d.lon, d.lat])[0] + 150
          } else if (d.wor == 'Asien') {
            return projection([d.lon, d.lat])[0] + 70
          } else if (d.wor == 'GUS | Russland') {
            return projection([d.lon, d.lat])[0]
          } else if (d.wor == 'Europa | MSOE') {
            return projection([d.lon, d.lat])[0] - 350
          }


        })
        .attr('y', function (d, i) {
          if (d.wor == 'Nordmerika' || d.wor == 'Latinamerika') {
            return projection([d.lon, d.lat])[1] + 100
          } else if (d.wor == 'Afrika') {
            return projection([d.lon, d.lat])[1] + 100
          } else if (d.wor == 'Asien') {
            return projection([d.lon, d.lat])[1] + 100
          } else if (d.wor == 'GUS | Russland') {
            return projection([d.lon, d.lat])[1] - 20
          } else if (d.wor == 'Europa | MSOE') {
            return projection([d.lon, d.lat])[1] + 50
          }

        })
        .style('font-size', '3em')
        .style('font-weight', 'bold')
        .style('fill', function (d, i) {
          return '#3e3e3e'

        });

      function clicked(d, i) {

      }

    });



  });
