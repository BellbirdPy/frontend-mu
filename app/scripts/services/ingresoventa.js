'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.ingresoVenta
 * @description
 * # ingresoVenta
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('IngresoVenta', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/contabilidad/ingreso_venta/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
