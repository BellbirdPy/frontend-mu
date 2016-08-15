'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Inseminacion
 * @description
 * # Inseminacion
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Inseminacion', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/inseminacion/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
