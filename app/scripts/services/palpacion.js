'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Palpacion
 * @description
 * # Palpacion
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Palpacion', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/palpacion/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
