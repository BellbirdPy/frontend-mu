'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoMortandadCtrl
 * @description
 * # DialogsDialogoMortandadCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoMortandadCtrl', function ($scope, $mdDialog, Animal, Mortandad, ServerData, lista) {

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
          var listaId = [];
          angular.forEach(lista, function (animalSeleccionado) {
            listaId.push(animalSeleccionado.id);
            animalSeleccionado.estado = 'M';
            animalSeleccionado.lote = null;
            Animal.update({id: animalSeleccionado.id}, animalSeleccionado, function (data) {
            });
          });
          var nuevo = new Mortandad($scope.form);
          nuevo.establecimiento = ServerData.establecimiento.id;
          nuevo.animales = [];
          nuevo.$save(function (result) {
            result.animales = listaId;
            Mortandad.update({id: result.id}, result, function (data) {
              console.log(data);
            });
          }, function (error) {
            console.log(error);
          });

          $mdDialog.hide(lista);
        }
      }
    };

  });
