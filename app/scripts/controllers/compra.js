'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:CompraCtrl
 * @description
 * # CompraCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('CompraCtrl', function ($scope, $filter, $mdDialog, Animal, Compra) {
    $scope.compras = [];
    $scope.seleccionCompra = [];
    $scope.comprasCargadas = false;

    //Esto se encarga de cargar en el escope el listado de compras
    $scope.updateListadoCompras = function () {
      $scope.promise = Compra.get({establecimiento: 1}, function (response) {
        $scope.compras = response.results;
        if ($scope.compras !== []) {
          $scope.comprasCargadas = true;
        }
      });
    };
    $scope.updateListadoCompras();

    $scope.query = {
      order: 'fecha',
      limit: 5,
      page: 1
    };

    $scope.verDetalleCompra = function (compra) {
      console.log(compra);
      //Aca va ir una vista detallada de la compra
    };

    $scope.abrirFormCarga = function () {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_compra.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearCompraCtrl'
      }).then(function () {
        $scope.updateListadoCompras();
      });
    };
  });
