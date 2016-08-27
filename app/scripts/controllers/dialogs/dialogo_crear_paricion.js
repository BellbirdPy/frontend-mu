'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearParicionCtrl
 * @description
 * # DialogsDialogoCrearParicionCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearParicionCtrl', function ($scope, $mdDialog, ServerData,Palpacion, Paricion,Potrero, Animal,Lote,Raza,Categoria) {
    var obj = ServerData;

    $scope.newLote = {};
    $scope.newLote.potrero = "";
    $scope.newLote.cantidad = 0;
    $scope.newLote.peso_promedio = 0;
    $scope.newLote.establecimiento = obj.establecimiento.id;
    $scope.newLote.animales = [];

    //-----------------------------RAZAS----------------//

    $scope.razas = Raza.get(function(response){
      $scope.razas = response.results;
    });

    //-----------------------------CATEGORIAS----------------//
    $scope.categorias = Categoria.get(function(response){
      $scope.categorias = response.results;
    });


    //-----------------------------POTREROS----------------//
    $scope.potreros = {};
    $scope.queryPotreros = {establecimiento: ServerData.establecimiento.id,limit:100,ordering: 'id',page: 1};


    function successPotreros(potreros) {
      $scope.potreros = potreros.results;
    }

    $scope.getPotreros = function () {
      $scope.promisePotreros = Potrero.get($scope.queryPotreros,successPotreros).$promise;
    };

    $scope.getPotreros();
    //-----------------------------LOTES----------------//
    $scope.lotes = {};
    $scope.loteSeleccionado = null;
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};

    var cantidad_prenada = 0;


    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes,successLotes).$promise;
    };

    $scope.getLotes();
    //---------------------------FIN-LOTES--------------//

    $scope.tipos = [{simbolo:'N',nombre:'Monta Natural'},{simbolo:'I',nombre:'Inseminación Artificial'}];
    $scope.selectedAnimales = [];
    if (obj.palpacion_seleccionada){
      $scope.palpacion = obj.palpacion_seleccionada;
      var lote = $scope.palpacion.lote;
    }
    $scope.pariciones = [];
    $scope.animales = {};
    $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:20,estado:'V',prenada:true,categoria__is_hembra:true,palpaciones:$scope.palpacion.id,ordering: 'id',page: 1};


    $scope.deseleccionar = function (animal) {
      if ($scope.selectedAnimales.indexOf(animal) == -1) {
        animal.gestacion = null;
      }
    };

    $scope.seleccionar = function (animal) {
      if ($scope.selectedAnimales.indexOf(animal) != -1) {
        $scope.selectedAnimales.push(animal);
      }
    };


    function successAnimales(animales) {
      angular.forEach(animales.results,function(animal){
        animal.raza_hijo = null;
        animal.categoria_hijo = null;
      });
      $scope.animales = animales;

    }

    $scope.getAnimales = function () {
      $scope.promiseAnimales = Animal.get($scope.queryAnimales,successAnimales).$promise;
    };

    $scope.getAnimales();

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };


    $scope.cargarDetalleParicion = function () {
      $scope.pariciones = [];
      angular.forEach($scope.animales.results,function (animal) {
        if (animal.raza_hijo != null && animal.categoria_hijo!=null){
          var newParicion = {};
          var currentMonth = $scope.fecha.getMonth() + 1;
          newParicion.fecha = $scope.fecha.getFullYear() + '-' + currentMonth + '-' + $scope.fecha.getDate();
          newParicion.madre = animal.id;
          newParicion.aborto = false;
          newParicion.palpacion = obj.palpacion_seleccionada.id;
          newParicion.establecimiento = obj.establecimiento.id;
          var stringFecha = $scope.fecha.getFullYear().toString();
          newParicion.hijo = {
            carimbo:stringFecha[stringFecha.length -1],
            categoria:animal.categoria_hijo,
            raza:animal.raza_hijo,
            caravana_madre:animal.caravana,
            origen:'N',
            establecimiento:obj.establecimiento.id
          };
          $scope.pariciones.push(newParicion);
        }
      });
    };

    $scope.cambiarRaza = function (raza) {
      angular.forEach($scope.selectedAnimales,function (animal) {
        animal.raza_hijo = raza;
        if (raza == null){
          animal.categoria_hijo = null;
        }
      });
      $scope.razaSelected = {};

    };

    $scope.cambiarCategoria = function (categoria) {
      angular.forEach($scope.selectedAnimales,function (animal) {
        animal.categoria_hijo = categoria;
        if (categoria == null){
          animal.raza_hijo = null;
        }
      });
      $scope.categoria_selected = {};

    };


    $scope.guardarParicion = function () {
      var nuevoLote = {};
      $scope.cargarDetalleParicion();
      if ($scope.loteSeleccionado == 'otro') {
        nuevoLote = new Lote($scope.newLote);
        nuevoLote.animales = [];
        nuevoLote.establecimiento = obj.establecimiento.id;

        nuevoLote.$save(function (lote) {
          if (lote.hasOwnProperty('id')) {
            angular.forEach($scope.pariciones,function(paricion){
              paricion.lote = lote.id;
            });
            Paricion.create({pariciones:$scope.pariciones},function(data){
              console.log(data);
            });
            $scope.hide();

          }

        });
      } else {
        angular.forEach($scope.pariciones,function(paricion){
          paricion.lote = $scope.loteSeleccionado;
        });
        var nuevaParicion = new Paricion($scope.newParicion);
        nuevaParicion.lote = $scope.loteSeleccionado;
        Paricion.create({pariciones:$scope.pariciones},function(data){
          console.log(data);
        });
        $scope.hide();
      }
    }
  });
