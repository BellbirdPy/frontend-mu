'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Venta
 * @description
 * # Venta
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Venta', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/venta/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
