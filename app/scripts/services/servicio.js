'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Servicio
 * @description
 * # Servicio
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Servicio', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/servicio/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
