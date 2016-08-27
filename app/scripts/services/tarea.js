'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.tarea
 * @description
 * # tarea
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('Tarea', function($resource) {
    return $resource('http://127.0.0.1:8000/api/tarea/:id/',null,{

    });
  });

