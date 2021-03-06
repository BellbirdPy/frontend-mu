'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Categoria
 * @description
 * # Categoria
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Categoria', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/categoria/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
