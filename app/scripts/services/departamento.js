'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.departamento
 * @description
 * # departamento
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Departamento', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/departamento/', null, {
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  });
