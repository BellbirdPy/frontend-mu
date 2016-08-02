'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearServicioCtrl
 * @description
 * # DialogsDialogoCrearServicioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearServicioCtrl', function ($scope, $mdDialog, ServerData, Servicio, Lote) {
    var obj = ServerData;

    $scope.tipos = [{simbolo:'N',nombre:'Monta Natural'},{simbolo:'I',nombre:'Inseminación Artificial'}]
    $scope.selectedLotes = [];
    if (obj.servicio_seleccionada){
      $scope.editar = true;
      $scope.newServicio = obj.servicio_seleccionada;
      $scope.selectedLotes = obj.servicio_seleccionada.lotes;
      $scope.fecha_inicio = new Date($scope.newServicio.fecha_inicio);
      $scope.fecha_fin = new Date($scope.newServicio.fecha_fin);
    }else {
      $scope.editar = false;
      $scope.newServicio = {};
      $scope.fecha_fin = new Date();
      $scope.fecha_inicio = new Date();
    }
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};


    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes,successLotes).$promise;
      $scope.selectedLotes = [];
    };

    $scope.getLotes();

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };


    $scope.cargarDetalleServicio = function () {
      $scope.newServicio.lotes = $scope.selectedLotes;
    };


    $scope.guardarServicio = function () {
      if ($scope.editar){
        $scope.newServicio.fecha_inicio = $scope.fecha_inicio.getFullYear() + '-'
          + $scope.fecha_inicio.getMonth() + '-' + $scope.fecha_inicio.getDate();
        $scope.newServicio.fecha_fin = $scope.fecha_fin.getFullYear() + '-'
          + $scope.fecha_fin.getMonth() + '-' + $scope.fecha_fin.getDate();
        Servicio.update({id:$scope.newServicio.id},$scope.newServicio,function(data){
          $scope.newServicio = data;
          $mdDialog.hide($scope.newServicio);
        });
      }

      $scope.cargarDetalleServicio();
      console.log($scope.newServicio);

      $scope.newServicio.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      $scope.newServicio.fecha_inicio = $scope.fecha_inicio.getFullYear() + '-'
        + $scope.fecha_inicio.getMonth() + '-' + $scope.fecha_inicio.getDate();
      $scope.newServicio.fecha_fin = $scope.fecha_fin.getFullYear() + '-'
        + $scope.fecha_fin.getMonth() + '-' + $scope.fecha_fin.getDate();
      var nuevaServicio = new Servicio($scope.newServicio);
      nuevaServicio.$save(function () {
          console.log('Servicio realizada');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();
    }
  });
