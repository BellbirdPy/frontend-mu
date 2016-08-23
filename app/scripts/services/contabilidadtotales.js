'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.contabilidadTotales
 * @description
 * # contabilidadTotales
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('ContabilidadTotales', function($resource) {
    return $resource('http://127.0.0.1:8000/api/contabilidad/totales/:id/',null,{

    });
  });
