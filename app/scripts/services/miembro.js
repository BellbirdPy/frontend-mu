'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Miembro
 * @description
 * # Miembro
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Miembro', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/miembro/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
