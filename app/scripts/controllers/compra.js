'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:CompraCtrl
 * @description
 * # CompraCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('CompraCtrl', function ($scope, $filter, $mdDialog, Animal, Compra, DetalleCompra, ServerData) {
    var obj = ServerData;
    $scope.compras = [];
    $scope.selectionCompra = [];
    $scope.selectedAll = false;
    $scope.cargandoCompra = false;

    $scope.updateCompra = function () {
      Compra.query({establecimiento: obj.establecimiento.id}, function (response) {
        $scope.compras = response;
        $scope.cargandoCompra = true;
      })
    };
    $scope.updateCompra();

    $scope.abrir = function (compra) {
      console.log(compra);
      //Aca va ir una vista detallada de la compra
    }

    $scope.abrirFormCarga = function () {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_compra.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearCompraCtrl'
      }).then(function () {
        $scope.updateCompra();
      })
    }
  });
