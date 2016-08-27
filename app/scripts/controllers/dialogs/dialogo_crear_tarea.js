/**
 * Created by ruben on 08/08/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearTareaCtrl
 * @description
 * # DialogsDialogoCrearTareaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearTareaCtrl', function ($scope, $mdDialog, ServerData, Tarea, Utilidades, EstablecimientoUsuarios) {
    var obj = ServerData;
    $scope.queryUsuarios = {establecimiento:obj.establecimiento.id};

    function successUsuarios(usuarios) {
      $scope.usuarios = usuarios;
    }

    $scope.getUsuarios = function () {
      $scope.promiseUsuarios = EstablecimientoUsuarios.get($scope.queryUsuarios, successUsuarios).$promise;
    };

    $scope.getUsuarios();
    console.log($scope.usuarios);
    $scope.hide = function () {
      $mdDialog.hide();
    };
    console.log($scope.usuarios);
    if (obj.tarea_seleccionada){
      $scope.editar = true;
      $scope.newTarea = obj.tarea_seleccionada;
      $scope.fecha = new Utilidades.toDate($scope.newTarea.fecha);
    }else {
      $scope.editar = false;
      $scope.newTarea = {};
      $scope.fecha = new Date();
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };





    $scope.guardarTarea = function () {

      if ($scope.editar){
        $scope.newTarea.fecha = $scope.fecha.getFullYear() + '-'
          + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();
        $scope.newTarea.leido= false;
        Tarea.update({id:$scope.newTarea.id},$scope.newTarea,function(data){
          $scope.newTarea = data;
          $mdDialog.hide($scope.newTarea);
        });
      }else{

        console.log($scope.newTarea);

        $scope.newTarea.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
        //Formateamos la fecha
        console.log()
        $scope.newTarea.fecha = $scope.fecha.getFullYear() + '-'
          + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();
        $scope.newTarea.leido= false;
        console.log($scope.newTarea.fecha)
        var nuevoTarea = new Tarea($scope.newTarea);
        nuevoTarea.$save(function () {
            console.log('Tarea realizada');
          },
          function (error) {
            console.log(error);
          });
        $scope.hide();}
    }
  });
