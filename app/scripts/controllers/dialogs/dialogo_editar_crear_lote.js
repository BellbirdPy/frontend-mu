'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoEditarLoteCtrl
 * @description
 * # DialogsDialogoEditarLoteCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoEditarCrearLoteCtrl', function ($scope, $mdDialog, Potrero, ServerData, Lote, loteSeleccionado) {
    $scope.potreros = [];

    $scope.potreros = Potrero.get({
      establecimiento: ServerData.establecimiento.id
    }, function (response) {
      $scope.potreros = response.results;
    });

    $scope.newLote = {};
    if (loteSeleccionado) {
      $scope.newLote = loteSeleccionado;
    } else {
      $scope.newLote.potrero = "";
      $scope.newLote.cantidad = 0;
      $scope.newLote.peso_promedio = 0;
      $scope.newLote.establecimiento = ServerData.establecimiento.id;
      $scope.newLote.animales = [];
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      if (answer === 'guardar') {
        if (loteSeleccionado) {
          Lote.update({id: $scope.newLote.id}, $scope.newLote, function (data) {
            $scope.newLote = data;
            $mdDialog.hide($scope.newLote);
          });

        } else {
          var nuevo = new Lote($scope.newLote);

          nuevo.$save(function () {

          }, function (error) {
            console.log(error);
          });
          $mdDialog.hide(nuevo);
        }
      }
    };

  });
