'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.LoteAnimalCompleto
 * @description
 * # LoteAnimalCompleto
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('LoteAnimalCompleto', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/lote_completo/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });
