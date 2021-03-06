'use strict';

angular.module('adf.widget.charts')
  .service('chartService', function ($q) {
    return {
      getSpreadsheet: function (path) {
        var deferred = $q.defer();
        var data = Tabletop.init({
          key: path,
          callback: function (data, tabletop) {
            if (data) {             
              deferred.resolve(data);

            } else {
              deferred.reject(data.message);
            }
          },
          simpleSheet: true,
          debug: true
        });
        return deferred.promise;
      }
    }

  })
