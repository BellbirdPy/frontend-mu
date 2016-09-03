'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoAgregarEstablecimientoCtrl
 * @description
 * # DialogsDialogoAgregarEstablecimientoCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoAgregarEstablecimientoCtrl', function ($scope, $mdDialog, Departamento) {

    Departamento.get(function (response) {
      $scope.departamentos = response;
    });


    $scope.guardar = function () {
      console.log('Fue presionado guardar');
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    }
  });
