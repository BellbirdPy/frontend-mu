'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCargaMasivaCtrl
 * @description
 * # DialogsDialogoCargaMasivaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCargaMasivaCtrl', function ($scope, $mdDialog, Animal, Categoria, Raza, ServerData, Compra, Lote, $mdToast, Utilidades, SweetAlert) {
    var obj = ServerData;
    $scope.newCompra = {
      establecimiento: obj.establecimiento.id,
      cod_establecimiento_vendedor: obj.establecimiento.id,
      nombre_vendedor: 'carga masiva sistema',
      numero_guia: '1',
      precio_total: 0,
      carga_masiva: true
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


    $scope.guardarCompra = function (newCompra) {
      if ($scope.newCompra.detalle_compra.length !== 0) {
        $scope.newCompra.establecimiento = obj.establecimiento.id;
        //Formateamos la fecha
        $scope.newCompra.fecha_compra = $scope.fecha_compra.getFullYear() + '-'
          + $scope.fecha_compra.getMonth() + '-' + $scope.fecha_compra.getDate();
        var nuevaCompra = new Compra($scope.newCompra);
        Utilidades.showSimpleToast('Este proceso puede tardar unos minutos');
        nuevaCompra.$save(function () {
            console.log('Compra realizada');
            Utilidades.showSimpleToast('Carga masiva realizada!');
          },
          function (error) {
            console.log(error);
            Utilidades.showSimpleToast('Ocurrió un error!');
          });
        $scope.hide();
      } else {
        SweetAlert.swal("Debe ingresar los detalles de la carga");
      }
    }
  });
