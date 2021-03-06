'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Nutricion
 * @description
 * # Nutricion
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Nutricion', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/nutricion/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
