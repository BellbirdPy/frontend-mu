'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearPalpacionCtrl
 * @description
 * # DialogsDialogoCrearPalpacionCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearPalpacionCtrl', function ($scope, $mdDialog, ServerData, Palpacion,Potrero, Animal,Lote,$filter) {
    var obj = ServerData;

    $scope.newLote = {};
    $scope.newLote.potrero = "";
    $scope.newLote.cantidad = 0;
    $scope.newLote.peso_promedio = 0;
    $scope.newLote.establecimiento = obj.establecimiento.id;
    $scope.newLote.animales = [];
    var animalesPalpados = [];

    //-----------------------------LOTES----------------//
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
    if (obj.servicio_seleccionada){
      $scope.servicio = obj.servicio_seleccionada;
      var lote = $scope.servicio.lote;
    }


      $scope.editar = false;
      $scope.newPalpacion = {metodo:'M'};
      $scope.fecha= new Date();

    $scope.animales = {};
    $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:20,estado:'V',categoria__is_hembra:true,lote:lote,ordering: 'id',page: 1};


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

    $scope.setDefaultGestacion = function (animal) {
      console.log(animal);
      if (animal.hasOwnProperty('gestacion')) {
        if (animal.gestacion == null) {
          animal.gestacion = 'Chico';
        }
      }else{
        animal.gestacion = 'Chico';
      }
    };


    function successAnimales(animales) {
      $scope.animales = animales;
      angular.forEach(animalesPalpados,function(animalPalpado){
        var prueba = $filter('filter')($scope.animales.results,function (d) {return d.id.toString() === animalPalpado.id.toString();})[0];
        if (prueba) {
          if (prueba.id === animalPalpado.id) {
            angular.extend(prueba, animalPalpado);
          }
        }
      });


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


    $scope.cargarDetallePalpacion = function () {
      $scope.newPalpacion.detalles = [];
      angular.forEach($scope.animales.results,function (animal) {
        if (animal.gestacion != 'Vacia'){
          if ($scope.newPalpacion.metodo == 'M'){
            animal.gestacion = null;
          }
          cantidad_prenada +=1;
          animal.prenada = true;
          $scope.newPalpacion.detalles.push({animal:animal.id,resultado:true,gestacion:animal.gestacion});
        }else{
          animal.prenada = false;
          $scope.newPalpacion.detalles.push({animal:animal.id,resultado:false,gestacion:animal.gestacion});
        }
      });



    };

    $scope.cambiarGestacion = function (gestacion) {
      angular.forEach($scope.selectedAnimales,function (animal) {
        animal.gestacion = gestacion;
        var prueba = $filter('filter')(animalesPalpados,function (d) {return d.id.toString() === animal.id.toString();})[0];
        if (prueba) {
          if (prueba.id === animal.id) {
            animalesPalpados.splice(animalesPalpados.indexOf(prueba),1);
          }
        }
      });
      animalesPalpados = animalesPalpados.concat($scope.selectedAnimales);
      console.log(animalesPalpados);
      $scope.selectedAnimales = [];
      $scope.gestacionSelected = {};

    };



    $scope.guardarPalpacion = function () {
      var nuevoLote = {};
      $scope.cargarDetallePalpacion();
      $scope.newPalpacion.cantidad_total = $scope.animales.count;
      $scope.newPalpacion.cantidad_prenados = cantidad_prenada;
      $scope.newPalpacion.servicio = $scope.servicio.id;
      $scope.newPalpacion.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      var currentMonth = $scope.fecha.getMonth() + 1;
      $scope.newPalpacion.fecha = $scope.fecha.getFullYear() + '-'
        + currentMonth + '-' + $scope.fecha.getDate();

      if ($scope.loteSeleccionado == 'otro') {
        nuevoLote = new Lote($scope.newLote);
        nuevoLote.animales = [];
        nuevoLote.establecimiento = obj.establecimiento.id;
        angular.forEach($scope.animales.results, function (animal) {
          if (animal.prenada == true){
            nuevoLote.animales.push(animal.id);
          }
        });

        nuevoLote.$save(function (lote) {
          if (lote.hasOwnProperty('id')) {
            var nuevaPalpacion = new Palpacion($scope.newPalpacion);
            nuevaPalpacion.lote = lote.id;
            nuevaPalpacion.$save(function () {
                console.log('Palpacion realizada');
              },
              function (error) {
                console.log(error);
              });
            $scope.hide();

          }

        });
      } else {

        var nuevaPalpacion = new Palpacion($scope.newPalpacion);
        nuevaPalpacion.lote = $scope.loteSeleccionado;
        nuevaPalpacion.$save(function (palpacion) {
            console.log('Palpacion realizada');
          },
          function (error) {
            console.log(error);
          });
        $scope.hide();
      }
    }
  });
