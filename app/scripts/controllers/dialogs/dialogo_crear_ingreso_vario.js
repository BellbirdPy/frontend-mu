/**
 * Created by ruben on 12/08/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearIngresoVarioCtrl
 * @description
 * # DialogsDialogoCrearIngresoVarioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearIngresoVarioCtrl', function ($scope, $mdDialog, ServerData, IngresoVario, Utilidades) {
    var obj = ServerData;

    if (obj.ingresoVario_seleccionado){
      $scope.editar = true;
      $scope.newIngresoVario = obj.ingresoVario_seleccionado;
      $scope.fecha = new Utilidades.toDate($scope.newIngresoVario.fecha);
    }else {
      $scope.editar = false;
      $scope.newIngresoVario = {};
      $scope.fecha = new Date();
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };





    $scope.guardarIngresoVario = function () {
      if(!angular.isUndefined($scope.form)){
        $scope.newIngresoVario.descripcion=$scope.form.descripcion;
      }
      if ($scope.editar){
        $scope.newIngresoVario.fecha = $scope.fecha.getFullYear() + '-'
          + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();

        IngresoVario.update({id:$scope.newIngresoVario.id},$scope.newIngresoVario,function(data){
          $scope.newIngresoVario = data;
          $mdDialog.hide($scope.newIngresoVario);
        });
      }else {

      console.log($scope.newIngresoVario);

      $scope.newIngresoVario.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      console.log()
      $scope.newIngresoVario.fecha = $scope.fecha.getFullYear() + '-'
        + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();
      console.log($scope.newIngresoVario.fecha)
      var nuevoIngresoVario = new IngresoVario($scope.newIngresoVario);
      nuevoIngresoVario.$save(function () {
          Utilidades.showSimpleToast('Se creó correctamente!');
        },
        function (error) {
          Utilidades.showSimpleToast('Ocurrió algún error!');
        });
      $scope.hide();
    }}
  });
