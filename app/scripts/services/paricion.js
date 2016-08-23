'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Paricion
 * @description
 * # Paricion
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Paricion', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/paricion/:id/',null,{
      'update': { method:'PUT' },
      'create': { method:'POST',isArray:true},
      'delete': {method:'DELETE'}
    });
  });
