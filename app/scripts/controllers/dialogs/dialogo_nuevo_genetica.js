/**
 * Created by ruben on 29/08/16.
 */
'use strict';

/**
 * @ngdoc function
 <<<<<<< HEAD
 * @name frontendmuApp.controller:DialogsDialogoNuevoGeneticaCtrl
 * @description
 * # DialogsDialogoNuevoGeneticaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoNuevoGeneticaCtrl', function ($scope, $mdDialog, ServerData, Animal, Categoria, Raza, Lote) {

    var obj = ServerData;
    $scope.estados_sanitarios = [{c: 'E', display: 'En fecha'}, {c: 'N', display: 'No esta en fecha'}, {
      c: 'D',
      display: 'En fecha'
    }];

    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response;
    });
    $scope.razas = Raza.get(function (response) {
      $scope.razas = response;
    });


    $scope.queryAnimales = {
      establecimiento: ServerData.establecimiento.id,
      limit: 20,
      estado: 'V',
      ordering: 'lote__nombre',
      page: 1
    };
    $scope.selectedAnimales = [];

    function successAnimales(animales) {
      $scope.animales = animales;
    }

    $scope.getAnimales = function () {
      console.log($scope.queryAnimales);
      $scope.promiseAnimales = Animal.get($scope.queryAnimales, successAnimales).$promise;
      $scope.selectedAnimales = [];
    };

    $scope.getAnimales();
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id, estado: 'N', ordering: 'id', page: 1};
    $scope.selectedLotes = [];

    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes, successLotes).$promise;
      $scope.selectedLotes = [];
    };

    $scope.getLotes();


  });
