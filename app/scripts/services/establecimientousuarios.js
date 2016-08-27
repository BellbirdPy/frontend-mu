'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.establecimientoUsuarios
 * @description
 * # establecimientoUsuarios
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('EstablecimientoUsuarios', function($resource) {
    return $resource('http://127.0.0.1:8000/api/establecimiento_usuarios/:id/',null,{

    });
  });

