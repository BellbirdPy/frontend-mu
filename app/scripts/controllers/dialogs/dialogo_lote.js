'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoLoteCtrl
 * @description
 * # DialogsDialogoLoteCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoLoteCtrl', function ($scope, $mdDialog, Potrero, ServerData, Lote, Animal, lista) {
    $scope.potreros = [];

    $scope.potreros = Potrero.get({establecimiento: ServerData.establecimiento.id}, function (response) {
      $scope.potreros = response.results;
    });

    $scope.newLote = {};
    $scope.newLote.potrero = "";
    $scope.newLote.cantidad = 0;
    $scope.newLote.peso_promedio = 0;
    $scope.newLote.establecimiento = ServerData.establecimiento.id;
    $scope.newLote.animales = [];

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      if (answer === 'guardar') {
        var nuevo = new Lote($scope.newLote);

        nuevo.$save(function (result) {
          if (lista.length >= 1) {
            angular.forEach(lista, function (animalSeleccionado) {
              animalSeleccionado.lote = nuevo.id;
              Animal.update({id: animalSeleccionado.id}, animalSeleccionado, function (data) {
                console.log(data);
              });
              animalSeleccionado.lote_nombre = nuevo.nombre;
            });
            $mdDialog.hide(lista);
          }

        }, function (error) {
          console.log(error);
        });
        $mdDialog.hide(lista);

      }
    };

  });
