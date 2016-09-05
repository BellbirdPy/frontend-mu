'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearCompraCtrl
 * @description
 * # DialogsDialogoCrearCompraCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearCompraCtrl', function ($scope, $mdDialog, Animal, Categoria, Raza, ServerData, Compra, Lote) {
    var obj = ServerData;
    $scope.newCompra = {};
    $scope.newDetalle = {};
    $scope.newCompra.detalle_compra = [];
    $scope.fecha_compra = new Date(2016,8,2);

    $scope.seleccionDetalleCompra = [];
    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response.results;
    });

    $scope.razas = Raza.get(function (response) {
      $scope.razas = response.results;
    });

    $scope.lotes = Lote.get({establecimiento: obj.establecimiento.id}, function (response) {
      $scope.lotes = response.results;
    });

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.query = {limit:5,page:1}

    $scope.cargarDetalleCompra = function (newDetalle) {
      var detalle_compra = {};
      detalle_compra.categoria = newDetalle.categoria.id;
      detalle_compra.categoria_nombre = newDetalle.categoria.nombre;

      detalle_compra.carimbo = newDetalle.carimbo;
      detalle_compra.raza = newDetalle.raza.id;
      detalle_compra.raza_nombre = newDetalle.raza.nombre;
      detalle_compra.cantidad = newDetalle.cantidad;
      detalle_compra.caravana_inicial = newDetalle.nro_caravana_inicial;
      detalle_compra.lote = newDetalle.lote.id;
      detalle_compra.lote_nombre = newDetalle.lote.nombre;

      $scope.newCompra.detalle_compra.push(detalle_compra);
      $scope.DetalleCompra = {};
    };


    $scope.guardarCompra = function (newCompra) {
      $scope.newCompra.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
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
