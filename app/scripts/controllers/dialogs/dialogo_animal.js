'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoAnimalCtrl
 * @description
 * # DialogsDialogoAnimalCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoAnimalCtrl', function ($scope, $mdDialog, Animal, Categoria, Raza, Lote, ServerData, animalSeleccionado) {
    var obj = ServerData;

    $scope.categorias = [];
    $scope.razas = [];
    $scope.lotes = [];

    $scope.lotes = Lote.get({establecimiento: obj.establecimiento.id}, function (response) {
      $scope.lotes = response.results;
    });

    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response.results;
    });

    $scope.razas = Raza.get(function (response) {
      $scope.razas = response.results;
    });

    $scope.newAnimal = {};

    if (animalSeleccionado) {
      $scope.newAnimal = animalSeleccionado;
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      if (answer === 'guardar') {
        if (animalSeleccionado) {
          Animal.update({id: $scope.newAnimal.id}, $scope.newAnimal, function (data) {
            $scope.newAnimal = data;
            $mdDialog.hide($scope.newAnimal);
          });
        } else {
          $scope.newAnimal.estado = "V";
          $scope.newAnimal.establecimiento = obj.establecimiento.id;
          var nuevo = new Animal($scope.newAnimal);

          nuevo.$save(function () {

          }, function (error) {
            console.log(error);
          });
          $mdDialog.hide(nuevo);
        }
      }
    };

  });
