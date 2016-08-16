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

    $scope.agregarLoteGenetica = function () {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote_genetica.html',
        targetEvent: null,
        controller: 'DialogsDialogoLoteGeneticaCtrl'
      }).then(function () {
        $scope.getLotes();
      });
    };

  });
