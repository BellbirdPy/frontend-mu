'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoLoteGeneticaCtrl
 * @description
 * # DialogsDialogoLoteGeneticaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoLoteGeneticaCtrl', function ($scope, $mdDialog, Lote, ServerData, Raza, Categoria, Animal, func, LoteGenetica) {


    //Preparamos las variables iniciales del formulario
    $scope.newLoteGenetica = {};
    $scope.newLoteGenetica.establecimiento = ServerData.establecimiento.id;

    //Provisoriamente vamos a utilizar un query general
    $scope.query = {establecimiento: ServerData.establecimiento.id, ordering: 'id', page: 1};

    $scope.promiseRaza = Raza.get($scope.query, function (response) {
      $scope.razas = response;
    }).$promise;

    $scope.promiseCategoria = Categoria.get($scope.query, function (response) {
      $scope.categorias = response;
    }).$promise;

    $scope.porcentajes = [25, 50, 75, 100];

    $scope.tipos_servicios = [{'id': 'IA', 'nombre': 'Inceminacion Artificial'},
      {'id': 'MN', 'nombre': 'Monta Natural'}];

    $scope.carimbos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    //Aca no vamos a mostrar los lotes que ya tienen genetica, y los lotes que estan vacios
    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.query, successLotes).$promise;
    };
    $scope.getLotes();

    if (func != null) {
      console.log(func);
      $scope.newLoteGenetica = func;
    }

    $scope.loteSeleccionado = function () {
      var loteSelected;
      var animalSelected;
      $scope.promiseLote = Lote.get({id: $scope.newLoteGenetica.lote}, function (response) {
        loteSelected = response;
        console.log(loteSelected);
        //traemos el primer animal del listado de animales
        Animal.get({id: loteSelected.animales[0]}, function (response) {
          animalSelected = response;
          if (animalSelected.id) {
            console.log(animalSelected);
            console.log('Cargando datos en los campos');
            $scope.newLoteGenetica.categoria = animalSelected.categoria;
            $scope.newLoteGenetica.raza = animalSelected.raza;
            $scope.newLoteGenetica.carimbo = animalSelected.carimbo;
            console.log('Datos cargados');
          } else {
            alert('El lote seleccionado esta vacio');
          }
        })
      }).$promise;
    };

    $scope.guardar = function () {
      if (func != null) {
        LoteGenetica.update({id: $scope.newLoteGenetica.id}, $scope.newLoteGenetica, function (response) {
          $scope.newLoteGenetica = response;
          $mdDialog.hide($scope.newLoteGenetica);
        })
      } else {
        var nuevoLoteGenetica = new LoteGenetica($scope.newLoteGenetica);
        nuevoLoteGenetica.$save();
        $mdDialog.hide();
      }
    }

  });
