'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Contratista
 * @description
 * # Contratista
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Contratista', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/contratista/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
