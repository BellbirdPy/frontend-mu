'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearCompraCtrl
 * @description
 * # DialogsDialogoCrearCompraCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearCompraCtrl', function ($scope, $mdDialog, Animal, Categoria, Raza, ServerData, Compra) {
    var obj = ServerData;
    $scope.newCompra = {};
    $scope.newDetalle = {};
    $scope.newCompra.detalle_compra = [];
    $scope.fecha_compra = new Date();

    $scope.seleccionDetalleCompra = [];
    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response.results;
    });

    $scope.razas = Raza.get(function (response) {
      $scope.razas = response.results;
    });
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.cargarDetalleCompra = function (newDetalle) {
      var detalle_compra = {};
      detalle_compra.categoria = newDetalle.categoria;
      detalle_compra.carimbo = newDetalle.carimbo;
      detalle_compra.raza = newDetalle.raza;
      detalle_compra.cantidad = newDetalle.cantidad;
      detalle_compra.caravana_inicial = newDetalle.nro_caravana_inicial;

      $scope.newCompra.detalle_compra.push(detalle_compra);
      $scope.DetalleCompra = {};
    };


    $scope.guardarCompra = function (newCompra) {
      $scope.newCompra.establecimiento = 1; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      $scope.newCompra.fecha_compra = $scope.fecha_compra.getFullYear() + '-'
        + $scope.fecha_compra.getMonth() + '-' + $scope.fecha_compra.getDate();
      var nuevaCompra = new Compra($scope.newCompra);
      nuevaCompra.$save(function () {
          console.log('Compra realizada');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();
    }
  });
