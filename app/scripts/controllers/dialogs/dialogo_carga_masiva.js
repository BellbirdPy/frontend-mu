'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCargaMasivaCtrl
 * @description
 * # DialogsDialogoCargaMasivaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCargaMasivaCtrl', function ($scope, $mdDialog, Animal, Categoria, Raza, ServerData, Compra, Lote, $mdToast) {
    var obj = ServerData;
    $scope.newCompra = {
      establecimiento:obj.establecimiento.id,
      cod_establecimiento_vendedor:obj.establecimiento.id,
      nombre_vendedor:'carga masiva sistema',
      numero_guia:'1',
      precio_total:0,
      carga_masiva:true
    };
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

    $scope.lotes = Lote.get({establecimiento: obj.establecimiento.id}, function (response) {
      $scope.lotes = response.results;
    });

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

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
    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }


    var showSimpleToast = function() {
      var pinTo = $scope.getToastPosition();
      $mdToast.show(
        $mdToast.simple()
          .textContent('Carga masiva realizada!')
          .position(pinTo )
          .hideDelay(3000)
      );
    };


    $scope.guardarCompra = function (newCompra) {
      $scope.newCompra.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      $scope.newCompra.fecha_compra = $scope.fecha_compra.getFullYear() + '-'
        + $scope.fecha_compra.getMonth() + '-' + $scope.fecha_compra.getDate();
      var nuevaCompra = new Compra($scope.newCompra);
      nuevaCompra.$save(function () {
          console.log('Compra realizada');
          showSimpleToast();
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();
    }
  });
