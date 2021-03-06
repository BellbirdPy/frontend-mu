'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Establecimiento
 * @description
 * # Establecimiento
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Establecimiento', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/establecimiento/:id/',null,{
      'create': { method:'POST'},
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
