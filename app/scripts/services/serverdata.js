'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.ServerData
 * @description
 * # ServerData
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('ServerData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      establecimiento: {
        "id": 1,
        "nombre": "Granja LaPuta",
        "estado": "A",
        "fecha_expiracion": "2016-12-31",
        "owner": 1,
        "miembros": [
          1
        ]
      }
    };
  });
