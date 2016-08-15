'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Pajuela
 * @description
 * # Pajuela
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Pajuela', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/pajuela/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
