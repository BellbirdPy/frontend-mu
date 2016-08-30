'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.genetica
 * @description
 * # genetica
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('LoteGenetica', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/genetica/genetica_lote/:id/', null, {
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  })
  .factory('AnimalGenetica', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/genetica/genetica_animal/:id/', null, {
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  });
