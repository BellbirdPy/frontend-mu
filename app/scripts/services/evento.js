'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Evento
 * @description
 * # Evento
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Evento', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/sanitacion/eventos/:id/',null);
  });
