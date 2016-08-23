'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.ingresoVario
 * @description
 * # ingresoVario
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('IngresoVario', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/contabilidad/ingreso_vario/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
