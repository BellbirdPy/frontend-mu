'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Utilidades
 * @description
 * # Utilidades
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('Utilidades', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var utilidades = {
      toDate: function (stringFecha) {
        console.log(stringFecha);
        var parts = stringFecha.split("-");
        console.log(parts);
        return new Date(parts[0], parts[1]-1, parts[2]);
      }
    };
    return utilidades;
  });
