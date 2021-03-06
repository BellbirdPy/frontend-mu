'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:ContabilidadCtrl
 * @description
 * # ContabilidadCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('ContabilidadCtrl', function ($scope, $filter, $mdDialog, Egreso, ContabilidadTotales,
                                            ReporteEgreso, ServerData, Venta, IngresoVario,
                                            Establecimiento) {

    $scope.queryVentas = {establecimiento: ServerData.establecimiento.id, ordering: 'id', page: 1};
    $scope.selectedVentas = [];

    function successVentas(ventas) {
      $scope.ventas = ventas;
      console.log($scope.ventas);
    }

    $scope.getVentas = function () {
      $scope.promiseVentas = Venta.get($scope.queryVentas, successVentas).$promise;
      $scope.selectedVentas = [];
    };

    $scope.getVentas();

    $scope.queryTotales = {establecimiento: ServerData.establecimiento.id};

    function successTotales(totales) {
      $scope.totales = totales;
    }

    $scope.getTotales = function () {
      console.log($scope.queryIngresosVenta);
      $scope.promiseTotales = ContabilidadTotales.get($scope.queryTotales, successTotales).$promise;
    };

    $scope.getTotales();
    /*
     $scope.queryIngresosVenta = {establecimiento: ServerData.establecimiento.id,limit:20, ordering: 'fecha',page: 1};
     $scope.selectedIngresosVenta = [];

     function successIngresosVenta(ingresosVenta) {
     $scope.ingresosVenta = ingresosVenta;
     }

     $scope.getIngresosVenta = function () {
     console.log($scope.queryIngresosVenta);
     $scope.promiseIngresosVenta = Venta.get($scope.queryIngresosVenta,successIngresosVenta).$promise;
     $scope.selectedIngresosVenta = [];
     };

     $scope.getIngresosVenta();
     */
    $scope.abrirFormCargaIngresoVenta = function (ingresoVenta) {
      ServerData.ingresoVenta_seleccionado = ingresoVenta;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_ingreso_venta.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearIngresoVentaCtrl'
      }).then(function () {
        $scope.getIngresosVenta();
        $scope.getTotales();
      });
    };
    $scope.deleteIngresoVenta = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_ingreso_venta.html',
        targetEvent: null,
        controller: ['$scope', '$mdDialog', 'IngresoVenta', '$filter', function ($scope, $mdDialog, IngresoVenta) {
          $scope.options = {
            pageSelect: true
          };
          $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
          };

          $scope.query = {
            limit: 20,
            page: 1
          };
          $scope.lista = lista;
          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar') {
              if (lista.length >= 1) {
                angular.forEach(lista, function (ingresoVenta) {
                  IngresoVenta.delete({id: ingresoVenta.id}, ingresoVenta, function (data) {
                    console.log("eliminado: " + data.fecha_ingresoVenta);
                  });
                });
              }
              $mdDialog.hide(lista);
            } else {
              $mdDialog.hide();
            }
          };

        }]
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getIngresosVenta();
            $scope.getTotales();
          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


    $scope.queryIngresosVarios = {
      establecimiento: ServerData.establecimiento.id,
      limit: 20,
      ordering: 'fecha',
      page: 1
    };
    $scope.selectedIngresosVarios = [];

    function successIngresosVarios(ingresosVarios) {
      $scope.ingresosVarios = ingresosVarios;
    }

    $scope.getIngresosVarios = function () {
      console.log($scope.queryIngresosVarios);
      $scope.promiseIngresosVarios = IngresoVario.get($scope.queryIngresosVarios, successIngresosVarios).$promise;
      $scope.selectedIngresosVarios = [];
    };

    //$scope.getIngresosVarios();

    $scope.abrirFormCargaIngreso = function (ingresoVario) {
      ServerData.ingresoVario_seleccionado = ingresoVario;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_ingreso_vario.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearIngresoVarioCtrl'
      }).then(function () {
        $scope.getIngresosVarios();
        $scope.getTotales();
      });
    };
    $scope.deleteIngresoVario = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_ingreso_vario.html',
        targetEvent: null,
        controller: ['$scope', '$mdDialog', 'IngresoVario', '$filter', function ($scope, $mdDialog, IngresoVario) {
          $scope.options = {
            pageSelect: true
          };
          $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
          };

          $scope.query = {
            limit: 20,
            page: 1
          };
          $scope.lista = lista;
          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar') {
              if (lista.length >= 1) {
                angular.forEach(lista, function (ingresoVario) {
                  IngresoVario.delete({id: ingresoVario.id}, ingresoVario, function (data) {
                    console.log("eliminado: " + data.fecha_ingresoVario);
                  });
                });
              }
              $mdDialog.hide(lista);
            } else {
              $mdDialog.hide();
            }
          };

        }]
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getIngresosVarios();
            $scope.getTotales();
          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


    $scope.generarReporte = function () {
      ServerData.mes = $scope.fecha_reporte.getMonth() + 1;
      ServerData.anho = $scope.fecha_reporte.getFullYear();
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_reporte_egreso.html',
        targetEvent: null,
        controller: 'DialogsDialogoReporteEgresoCtrl'
      });
    };


    $scope.queryEgresos = {establecimiento: ServerData.establecimiento.id, limit: 20, ordering: 'fecha', page: 1};
    $scope.selectedEgresos = [];
    $scope.rubros = [
      {c: 'GD', display: 'Gastos Directos'},
      {c: 'GA', display: 'Gastos Administrativos'},
      {c: 'IT', display: 'Impuestos y Tazas'},
      {c: 'GC', display: 'Gastos de Comercialización'},
      {c: 'GF', display: 'Gastos Financieros'}];

    function successEgresos(egresos) {
      $scope.egresos = egresos;
    }

    $scope.getEgresos = function () {
      console.log($scope.queryEgresos);
      $scope.promiseEgresos = Egreso.get($scope.queryEgresos, successEgresos).$promise;
      $scope.selectedEgresos = [];
    };

    $scope.getEgresos();

    $scope.abrirFormCarga = function (egreso) {
      ServerData.egreso_seleccionada = egreso;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_egreso.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearEgresoCtrl'
      }).then(function () {
        $scope.getEgresos();
      });
    };
    $scope.deleteEgreso = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_egreso.html',
        targetEvent: null,
        controller: ['$scope', '$mdDialog', 'Egreso', '$filter', function ($scope, $mdDialog, Egreso) {
          $scope.options = {
            pageSelect: true
          };
          $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
          };

          $scope.query = {
            limit: 20,
            page: 1
          };
          $scope.lista = lista;
          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar') {
              if (lista.length >= 1) {
                angular.forEach(lista, function (egreso) {
                  Egreso.delete({id: egreso.id}, egreso, function (data) {
                    console.log("eliminado: " + data.fecha_egreso);
                  });
                });
              }
              $mdDialog.hide(lista);
            } else {
              $mdDialog.hide();
            }
          };

        }]
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getEgresos();
          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


  });
