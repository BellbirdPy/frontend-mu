'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Mortandad
 * @description
 * # Mortandad
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Mortandad', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/mortandad/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
