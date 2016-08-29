'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoAnimalGeneticaCtrl
 * @description
 * # DialogsDialogoAnimalGeneticaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoAnimalGeneticaCtrl', function ($scope, $mdDialog, Lote, ServerData, Raza, Categoria, Animal,
                                                            func, LoteGenetica, AnimalGenetica) {

    //Preparamos las variables iniciales del formulario
    $scope.newAnimalGenetica = {};
    $scope.newAnimalGenetica.animal = {};
    $scope.newAnimalGenetica.establecimiento = ServerData.establecimiento.id;

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

    function successAnimal(animales) {
      $scope.animales = animales;
    }

    //Aca no vamos a mostrar los lotes que ya tienen genetica, y los lotes que estan vacios
    $scope.getAnimales = function () {
      $scope.promiseAnimales = Animal.get($scope.query, successAnimal).$promise;
    };
    $scope.getAnimales();

    if (func != null) {
      console.log(func);
      $scope.newAnimalGenetica = func;
    }

    $scope.loteSeleccionado = function () {
      var loteSelected;
      var animalSelected;
      $scope.promiseLote = Lote.get({id: $scope.newAnimalGenetica.lote}, function (response) {
        loteSelected = response;
        console.log(loteSelected);
        //traemos el primer animal del listado de animales
        Animal.get({id: loteSelected.animales[0]}, function (response) {
          animalSelected = response;
          if (animalSelected.id) {
            console.log(animalSelected);
            console.log('Cargando datos en los campos');
            $scope.newAnimalGenetica.categoria = animalSelected.categoria;
            $scope.newAnimalGenetica.raza = animalSelected.raza;
            $scope.newAnimalGenetica.carimbo = animalSelected.carimbo;
            console.log('Datos cargados');
          } else {
            alert('El lote seleccionado esta vacio');
          }
        })
      }).$promise;
    };

    $scope.guardar = function () {
      $scope.newAnimalGenetica.lote_genetica = null;
      if (func != null) {
        console.log('Voy a actualizar los datos');
        AnimalGenetica.update({id: $scope.newAnimalGenetica.id}, $scope.newAnimalGenetica, function (response) {
          $scope.newAnimalGenetica = response;
          $mdDialog.hide($scope.newAnimalGenetica);
        })
      } else {
        var nuevoAnimalGenetica = new AnimalGenetica($scope.newAnimalGenetica);
        console.log(nuevoAnimalGenetica);
        nuevoAnimalGenetica.$save();
        //$mdDialog.hide();
      }
    }

    $scope.cargarAnimal = function () {
      Animal.get({caravana: $scope.newAnimalGeneticaCaravana}, function (response) {
        console.log(response);
        $scope.newAnimalGenetica.animal = response.results[0].id;
        $scope.categoria = response.results[0].categoria_nombre;
        $scope.raza = response.results[0].raza_nombre;
        $scope.carimbo = response.results[0].carimbo;

        console.log(AnimalGenetica.get({animal: $scope.newAnimalGenetica.animal}, function (response) {
            console.log(response.results[0]);
            if (response.results[0] != null) {

              $scope.newAnimalGenetica = response.results[0];
              func = $scope.newAnimalGenetica;
            }
          })
        )
      })
      ;
    }

  })
;
