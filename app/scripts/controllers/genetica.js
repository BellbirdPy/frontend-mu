'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:GeneticaCtrl
 * @description
 * # GeneticaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('GeneticaCtrl', function ($scope, LoteGenetica, AnimalGenetica, ServerData, $mdDialog) {

    // LOTES

    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id, ordering: 'id', page: 1}
    $scope.selectedLotes = [];

    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = LoteGenetica.get($scope.queryLotes, successLotes).$promise;
      $scope.selectedLotes = [];
    };

    $scope.getLotes();

    $scope.editLoteGenetica = function (func) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote_genetica.html',
        targetEvent: null,
        controller: 'DialogsDialogoLoteGeneticaCtrl',
        locals: {
          func: func
        }
      }).then(function () {
        $scope.getLotes();
        $scope.getAnimales();
      });
    };

    $scope.deleteLoteGenetica = function (lote) {
      var confirm = $mdDialog.confirm()
        .title('Esta seguro que desea eliminar?')
        .content('Esta seguro que desea eliminar los registros de gentica del lote: ' + lote.lote_nombre + ',' +
          'tambien se eliminaran los registros generados en cada animal del lote.')
        .targetEvent(null)
        .ok('Si, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function () {
        LoteGenetica.delete({id: lote.id}, lote, function (response) {
          //Esto actualiza llamando al server
          $scope.getAnimales();
        });
        //Esto actualiza sin volver a llamar al server
        $scope.lotes.results.splice($scope.lotes.results.indexOf(lote), 1);
        $scope.selectedLotes = [];
      }, function () {
        $scope.status = 'Se elimino correctamente.';
      });
    };

    // ANIMALES

    $scope.queryAnimales = {
      establecimeinto: ServerData.establecimiento.id,
      limit: 20,
      ordering: 'id',
      page: 1
    };
    $scope.selectedAnimales = [];

    function successAnimales(animales) {
      $scope.animalesGenetica = animales;
      console.log($scope.animalesGenetica);
    }

    $scope.getAnimales = function () {
      console.log($scope.queryAnimales);
      $scope.promiseAnimales = AnimalGenetica.get($scope.queryAnimales, successAnimales).$promise;
      $scope.selectedAnimales = [];
    };
    $scope.getAnimales();

    $scope.editAnimalGenetica = function (func) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_animal_genetica.html',
        targetEvent: null,
        controller: 'DialogsDialogoAnimalGeneticaCtrl',
        locals: {
          func: func
        }
      }).then(function () {
        $scope.getLotes();
        $scope.getAnimales();
      })
    };

    $scope.deleteAnimalGenetica = function (animal) {
      var confirm = $mdDialog.confirm()
        .title('Esta seguro que desea eliminar?')
        .content('Esta seguro que desea eliminar los registros de gentica del lote: ' + animal.lote_nombre + ',' +
          'tambien se eliminaran los registros generados en cada animal del lote.')
        .targetEvent(null)
        .ok('Si, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function () {
        LoteGenetica.delete({id: lote.id}, lote, function (response) {
          //Esto actualiza llamando al server
          $scope.getAnimales();
        });
        //Esto actualiza sin volver a llamar al server
        $scope.lotes.results.splice($scope.lotes.results.indexOf(lote), 1);
        $scope.selectedLotes = [];
      }, function () {
        $scope.status = 'Se elimino correctamente.';
      });
    };

    $scope.abrirDialogoNuevo = function () {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_nuevo_genetica.html',
        targetEvent: null,
        controller: 'DialogsDialogoNuevoGeneticaCtrl'
      }).then(function () {

      })
    }

  });
