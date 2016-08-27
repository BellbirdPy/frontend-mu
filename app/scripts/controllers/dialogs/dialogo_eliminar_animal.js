'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoEliminarAnimalCtrl
 * @description
 * # DialogsDialogoEliminarAnimalCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoEliminarAnimalCtrl', function ($scope, $mdDialog, Animal, AnimalList,Utilidades) {
    $scope.lista = lista;
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      if (answer === 'guardar') {
        if (lista.length >= 1) {
          AnimalList.delete({animales:lista}, function(){
            Utilidades.showSimpleToast('Se eliminaron correctamente!');
          },function(error){
            console.log(error);
            Utilidades.showSimpleToast('Ocurrió un error!');
          });
          /*
          angular.forEach(lista, function (animalSeleccionado) {
            Animal.delete({id: animalSeleccionado.id}, animalSeleccionado, function (data) {
              console.log("eliminado: " + data.caravana);
            });
          });
          */
        }
        $mdDialog.hide(lista);
      } else {
        $mdDialog.hide(lista);
      }
    };

  });
