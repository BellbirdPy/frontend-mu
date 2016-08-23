/**
 * Created by ruben on 15/08/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearIngresoVentaCtrl
 * @description
 * # DialogsDialogoCrearIngresoVentaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearIngresoVentaCtrl', function ($scope, $mdDialog, ServerData, IngresoVenta) {
    var obj = ServerData;

    if (obj.ingresoVenta_seleccionado){
      $scope.editar = true;
      $scope.newIngresoVenta = obj.ingresoVenta_seleccionado;
      $scope.fecha = new Date($scope.newIngresoVenta.fecha);
    }else {
      $scope.editar = false;
      $scope.newIngresoVenta = {};
      $scope.fecha = new Date();
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };





    $scope.guardarIngresoVenta = function () {
      if(!angular.isUndefined($scope.form)){
        $scope.newIngresoVenta.descripcion=$scope.form.descripcion;
      }
      if ($scope.editar){
        $scope.newIngresoVenta.fecha = $scope.fecha.getFullYear() + '-'
          + $scope.fecha.getMonth()+1 + '-' + $scope.fecha.getDate();

        IngresoVenta.update({id:$scope.newIngresoVenta.id},$scope.newIngresoVenta,function(data){
          $scope.newIngresoVenta = data;
          $mdDialog.hide($scope.newIngresoVenta);
        });
      }else{

      console.log($scope.newIngresoVenta);

      $scope.newIngresoVenta.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      console.log()
      $scope.newIngresoVenta.fecha = $scope.fecha.getFullYear() + '-'
        + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();
      console.log($scope.newIngresoVenta.fecha)
      var nuevoIngresoVenta = new IngresoVenta($scope.newIngresoVenta);
      nuevoIngresoVenta.$save(function () {
          console.log('IngresoVenta realizado');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();}
    }
  });
