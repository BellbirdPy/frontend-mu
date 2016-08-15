'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoLoteGeneticaCtrl
 * @description
 * # DialogsDialogoLoteGeneticaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoLoteGeneticaCtrl', function ($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

  });
