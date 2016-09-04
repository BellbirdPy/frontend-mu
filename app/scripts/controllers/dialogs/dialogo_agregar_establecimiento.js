'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoAgregarEstablecimientoCtrl
 * @description
 * # DialogsDialogoAgregarEstablecimientoCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoAgregarEstablecimientoCtrl', function ($scope, $mdDialog, Inicial, Departamento, Establecimiento) {

    $scope.inicial = Inicial;
    console.log($scope.inicial);

    Departamento.get(function (response) {
      $scope.departamentos = response;
    });

    $scope.planes = [
      {id: "P", nombre: "Premium"},
      {id: "E", nombre: "Estandar"},
      {id: "G", nombre: "Educativo"}
    ];


    $scope.guardar = function () {
      console.log('Fue presionado guardar');
      $scope.newEstablecimiento.estado = "A";
      var nuevoEstablecimiento = new Establecimiento($scope.newEstablecimiento);
      nuevoEstablecimiento.$save();
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    }
  });
