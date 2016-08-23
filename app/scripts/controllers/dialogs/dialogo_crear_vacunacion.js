/**
 * Created by ruben on 02/08/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearVacunacionCtrl
 * @description
 * # DialogsDialogoCrearVacunacionCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearVacunacionCtrl', function ($scope, $mdDialog, Categoria, Raza, ServerData, Vacunacion, Lote) {
    var obj = ServerData;
    console.log(obj);
    $scope.selectedLotes = [];
    if (obj.vacunacion_seleccionada){
      $scope.editar = true;
      console.log("hola");
      $scope.newVacunacion = obj.vacunacion_seleccionada;
      $scope.selectedLotes = obj.vacunacion_seleccionada.lotes;
      $scope.fecha_vacunacion = new Date($scope.newVacunacion.fecha_vacunacion);
    }else {
      $scope.editar = false;
      $scope.newVacunacion = {};
      $scope.fecha_vacunacion = new Date();
    }
    $scope.seleccionDetalleVacunacion = [];




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


    $scope.cargarDetalleVacunacion = function () {
      $scope.newVacunacion.lotes = $scope.selectedLotes;
    };


    $scope.guardarVacunacion = function () {
      if ($scope.editar){
        $scope.newVacunacion.fecha_vacunacion = $scope.fecha_vacunacion.getFullYear() + '-'
          + $scope.fecha_vacunacion.getMonth()+1 + '-' + $scope.fecha_vacunacion.getDate();
        Vacunacion.update({id:$scope.newVacunacion.id},$scope.newVacunacion,function(data){
          $scope.newVacunacion = data;
          $mdDialog.hide($scope.newVacunacion);
        });
      }else{

      $scope.cargarDetalleVacunacion();
      console.log($scope.newVacunacion);

      $scope.newVacunacion.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      $scope.newVacunacion.fecha_vacunacion = $scope.fecha_vacunacion.getFullYear() + '-'
        + $scope.fecha_vacunacion.getMonth()+1 + '-' + $scope.fecha_vacunacion.getDate();
      var nuevaVacunacion = new Vacunacion($scope.newVacunacion);
      nuevaVacunacion.$save(function () {
          console.log('Vacunacion realizada');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();}
    }
  });
