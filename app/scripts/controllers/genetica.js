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


  });
