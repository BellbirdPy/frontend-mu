'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Utilidades
 * @description
 * # Utilidades
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('Utilidades', function ($mdToast) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    var toastPosition = angular.extend({},last);
    var getToastPosition = function() {
      sanitizePosition();
      return Object.keys(toastPosition)
        .filter(function(pos) { return toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }


    var utilidades = {
      toDate: function (stringFecha) {
        console.log(stringFecha);
        var parts = stringFecha.split("-");
        console.log(parts);
        return new Date(parts[0], parts[1]-1, parts[2]);
      },
      showSimpleToast: function(texto){
        var pinTo = getToastPosition();
        $mdToast.show(
          $mdToast.simple()
            .textContent(texto)
            .position(pinTo )
            .hideDelay(3000)
        );
      }

    };
    return utilidades;
  });
