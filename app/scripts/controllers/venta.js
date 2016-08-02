'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:VentaCtrl
 * @description
 * # VentaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('VentaCtrl', function ($scope, ServerData, Venta,$mdDialog) {
    $scope.queryVentas = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};
    $scope.selectedVentas = [];

    function successVentas(ventas) {
      $scope.ventas = ventas;
      console.log($scope.ventas);
    }

    $scope.getVentas = function () {
      $scope.promiseVentas = Venta.get($scope.queryVentas,successVentas).$promise;
      $scope.selectedVentas = [];
    };

    $scope.getVentas();

    $scope.abrirFormCarga = function (venta) {
      ServerData.venta_seleccionada = venta;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_venta.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearVentaCtrl'
      }).then(function () {
        $scope.getVentas();
      });
    };

    $scope.deleteVenta = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_venta.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Venta','$filter' ,function ($scope, $mdDialog, Venta) {
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
            if (answer === 'guardar'){
              if (lista.length >= 1){
                angular.forEach(lista, function(venta){
                  Venta.delete({id:venta.id},venta,function(data){
                    console.log("eliminado: " + data.fecha_venta);
                  });
                });
              }
              $mdDialog.hide(lista);
            }else{
              $mdDialog.hide();
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getVentas();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };




  });
