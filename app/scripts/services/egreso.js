'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.egreso
 * @description
 * # egreso
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('Egreso', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/contabilidad/egreso/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
