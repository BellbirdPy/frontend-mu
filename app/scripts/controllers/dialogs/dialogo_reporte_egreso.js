/**
 * Created by ruben on 12/08/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoReporteEgresoCtrl
 * @description
 * # DialogsDialogoReporteEgresoCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoReporteEgresoCtrl', function ($scope, $mdDialog,ServerData, ReporteEgreso) {
    var obj = ServerData;
    $scope.queryReporteEgresos = {establecimiento: obj.establecimiento.id, mes: obj.mes, anho: obj.anho};

    function successReporteEgresos(reporteEgresos) {
      $scope.reporteEgresos = reporteEgresos;
    }

    $scope.getReporteEgresos = function () {
      $scope.promiseReporteEgresos = ReporteEgreso.get($scope.queryReporteEgresos, successReporteEgresos).$promise;
    };

    $scope.getReporteEgresos();
    $scope.hide = function () {
      $mdDialog.hide();
    };
  });
