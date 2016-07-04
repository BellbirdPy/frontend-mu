'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.compra
 * @description
 * # compra
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Compra', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('http://127.0.0.1:8000/api/compra/', null, {
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  })
  .factory('DetalleCompra', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/detalle_compra/', null, {
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  });
