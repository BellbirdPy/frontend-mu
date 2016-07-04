'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoRecategorizarAnimalCtrl
 * @description
 * # DialogsDialogoRecategorizarAnimalCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoRecategorizarAnimalCtrl', function ($scope, $mdDialog, Categoria, Animal, $filter, lista) {
    $scope.categorias = [];

    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response.results;
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

            animalSeleccionado.categoria = $scope.form.categoria;
            Animal.update({id: animalSeleccionado.id}, animalSeleccionado, function (data) {
              console.log(data);
            });
            var id = $scope.form.categoria;
            var categoria_nombre = $filter('filter')($scope.categorias, function (d) {
              return d.id.toString() === id.toString();
            })[0];
            animalSeleccionado.categoria_nombre = categoria_nombre.nombre;
          });
          $mdDialog.hide(lista);
        }
      }
    };

  });
