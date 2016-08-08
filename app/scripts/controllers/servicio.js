'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:ServicioCtrl
 * @description
 * # ServicioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('ServicioCtrl', function ($scope, ServerData, Servicio, Palpacion, $mdDialog) {
    $scope.queryServicios = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};
    $scope.selectedServicios = [];

    function successServicios(servicios) {
      $scope.servicios = servicios;
      console.log($scope.servicios);
    }

    $scope.getServicios = function () {
      $scope.promiseServicios = Servicio.get($scope.queryServicios,successServicios).$promise;
      $scope.selectedServicios = [];
    };

    $scope.getServicios();

    $scope.abrirFormCarga = function (servicio) {
      ServerData.servicio_seleccionada = servicio;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_servicio.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearServicioCtrl'
      }).then(function () {
        $scope.getServicios();
      });
    };

    $scope.deleteServicio = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_servicio.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Servicio','$filter' ,function ($scope, $mdDialog, Servicio) {
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
                angular.forEach(lista, function(servicio){
                  Servicio.delete({id:servicio.id},servicio,function(data){
                    console.log("eliminado: " + data.fecha_servicio);
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
            $scope.getServicios();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


  //---------------------------TERMINA SERVICIO -----------------------//
    //--------------------------------------------------------------//
    $scope.queryPalpaciones = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};
    $scope.selectedPalpaciones = [];

    function successPalpaciones(palpaciones) {
      $scope.palpaciones = palpaciones;
      console.log($scope.palpaciones);
    }

    $scope.getPalpaciones = function () {
      $scope.promisePalpaciones = Palpacion.get($scope.queryPalpaciones,successPalpaciones).$promise;
      $scope.selectedPalpaciones = [];
    };

    $scope.getPalpaciones();




  });
