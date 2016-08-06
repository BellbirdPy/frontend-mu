'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Vacunacion
 * @description
 * # Vacunacion
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Vacunacion', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/sanitacion/vacunacion/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
