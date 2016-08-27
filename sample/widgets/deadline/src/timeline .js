'use strict';

angular.module('adf.widget.timeline', ['adf.provider', 'ui.bootstrap'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('timeline', {
        title: 'Timeline',
        description: 'creates timelines from a given date',
        category: 'Big Numbers',
        templateUrl: '{widgetsPath}/deadline/src/view.html',
        controller: 'TimerCtrl',
        edit: {
          templateUrl: '{widgetsPath}/deadline/src/edit.html',
          controller: 'TimerCtrl'
        }
      });
  }).controller('TimerCtrl', function($scope, config){
  moment.duration.fn.format.defaults.weeks = /w+/;
  $scope.today = moment();
  $scope.selected = moment(config.sample)

  $scope.diffInMs = $scope.selected.diff($scope.today);
  $scope.diffInDays = $scope.selected.diff($scope.today, 'days');
  $scope.selected = function() {

     return config.sampleTwo
     };
     $scope.format =$scope.selected()
     $scope.dateSelected = moment(config.sample).format($scope.format);

console.log(-0.9>-1)


    $scope.daysfromNow= function(){
      if($scope.diffInDays>=1){
        $scope.dateToDisplay = "days after on" + " " + $scope.dateSelected;
        return moment.duration($scope.diffInDays, "days").format("d");
      } else if($scope.diffInDays<1 && $scope.diffInDays>=0){
        $scope.dateToDisplay = "hours after on" + " " + $scope.dateSelected;
        return moment.duration($scope.diffInDays, "days").format("h [hrs]");

      } else if($scope.diffInDays<0 && $scope.diffInDays>=-1){
       $scope.dateToDisplay = "hours ago on" + " " + $scope.dateSelected;
        return Math.abs(moment.duration($scope.diffInDays, "days").format("h [hrs]"));
    } else if($scope.diffInDays<-1){
       $scope.dateToDisplay = "days ago on" + " " + $scope.dateSelected;
      return Math.abs(moment.duration($scope.diffInDays, "days").format("d"));

    }
  }

  //subdate color
    $scope.subColor = function(){
      if($scope.diffInDays<=0){
        return '#fd414f'
      } else {
        return '#0396a6'
      }
    }


 //change format
    $scope.formats = [{
      "desc": "06.December.2016",
      "format": "dd-MMMM-yyyy"
    },{
        "desc": "06.12.16",
        "format": "DD.MM.YY"
      }, {
        "desc": "06/12/16",
        "format": "DD/MM/YY"
      }, {
        "desc": "06-12-16",
        "format": "DD-MM-YY"
      }, {
        "desc": "December 6th 2016",
        "format": "MMMM Do YYYY"
      }, {
        "desc": "6th 12 2016",
        "format": "Do MM YYYY"
      }, {
        "desc": "6th Dec 2016",
        "format": "Do MMM YYYY"
      }, {
        "desc": "Tuesday 6th Dec 2016",
        "format": "dddd Do MMM YYYY"
      }, {
        "desc": "Tue 6th Dec 2016",
        "format": "ddd Do MMM YYYY"
      }]










  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.format = $scope.formats[0].format;
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

   var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
  });
