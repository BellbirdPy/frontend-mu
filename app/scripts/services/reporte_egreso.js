'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.reporteEgreso
 * @description
 * # reporteEgreso
 * Service in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .service('ReporteEgreso', function($resource) {
  return $resource('http://127.0.0.1:8000/api/contabilidad/reporte_egreso/:id/',null,{

  });
});
