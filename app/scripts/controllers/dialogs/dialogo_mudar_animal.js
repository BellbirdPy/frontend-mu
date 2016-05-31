'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoMudarAnimalCtrl
 * @description
 * # DialogsDialogoMudarAnimalCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoMudarAnimalCtrl', function ($scope, $mdDialog, Lote, Animal, $filter, ServerData, lista) {
    var obj = ServerData;
    $scope.lotes = [];
    $scope.lotes = Lote.get({establecimiento: obj.establecimiento.id}, function (response) {
      $scope.lotes = response.results;
    });

    $scope.form = {};


    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      if (answer === 'guardar') {
        if (lista.length >= 1) {
          angular.forEach(lista, function (animalSeleccionado) {
            animalSeleccionado.lote = $scope.form.lote;
            Animal.update({id: animalSeleccionado.id}, animalSeleccionado, function (data) {
              console.log(data);
            });
            var lote_nombre = $filter('filter')($scope.lotes, function (d) {
              return d.id.toString() === $scope.form.lote.toString();
            })[0];
            animalSeleccionado.lote_nombre = lote_nombre.nombre;
          });
          $mdDialog.hide(lista);
        }
      }
    };
  });
