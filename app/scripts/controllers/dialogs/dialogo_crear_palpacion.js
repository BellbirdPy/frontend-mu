'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearPalpacionCtrl
 * @description
 * # DialogsDialogoCrearPalpacionCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearPalpacionCtrl', function ($scope, $mdDialog, ServerData, Palpacion, Animal,Lote) {
    var obj = ServerData;


    //-----------------------------LOTES----------------//
    $scope.lotes = {};
    $scope.loteSeleccionado = null;
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};


    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes,successLotes).$promise;
    };

    $scope.getLotes();
    //---------------------------FIN-LOTES--------------//

    $scope.tipos = [{simbolo:'N',nombre:'Monta Natural'},{simbolo:'I',nombre:'Inseminación Artificial'}]
    $scope.selectedAnimales = [];
    if (obj.servicio_seleccionada){
      $scope.servicio = obj.servicio_seleccionada;
      var cant = $scope.servicio.lote_completo.animales.length;
    }

    if (obj.palpacion_seleccionada){
      $scope.editar = true;
      $scope.newPalpacion = obj.palpacion_seleccionada;
      $scope.fecha = new Date($scope.newPalpacion.fecha);
    }else {
      $scope.editar = false;
      $scope.newPalpacion = {metodo:'M'};
      $scope.fecha= new Date();
    }
    $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:cant,lote:$scope.servicio.lote,categoria__is_hembra:true,ordering: 'id',page: 1};

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
      if (animal.gestacion == null) {
        animal.gestacion = 'chico';
      }
    };

    function successAnimales(animales) {
      $scope.animales = animales.results;
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
      angular.forEach($scope.selectedAnimales,function (animal) {
        animal.prenada= true;
        animal.lote = $scope.loteSeleccionado;
      });
      angular.forEach($scope.animales,function (animal) {
        console.log(animal);
        if (animal.prenada== true){
          if ($scope.newPalpacion.metodo= 'M'){
            animal.gestacion = null;
          }
          $scope.newPalpacion.detalles.push({animal:animal.id,resultado:true,gestacion:animal.gestacion});
        }else{
          $scope.newPalpacion.detalles.push({animal:animal.id,resultado:false,gestacion:animal.gestacion});
        }
      });



    };


    $scope.guardarPalpacion = function () {

      $scope.cargarDetallePalpacion();
      console.log($scope.newPalpacion);
      $scope.newPalpacion.cantidad_total = $scope.animales.length;
      $scope.newPalpacion.cantidad_prenados = $scope.selectedAnimales.length;
      $scope.newPalpacion.servicio = $scope.servicio.id;
      $scope.newPalpacion.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      console.log($scope.fecha);
      console.log($scope.fecha.getMonth());
      var currentMonth = $scope.fecha.getMonth() + 1;
      $scope.newPalpacion.fecha = $scope.fecha.getFullYear() + '-'
        + currentMonth + '-' + $scope.fecha.getDate();
      var nuevaPalpacion = new Palpacion($scope.newPalpacion);
      nuevaPalpacion.$save(function () {
          console.log('Palpacion realizada');
        angular.forEach($scope.selectedAnimales,function (animal) {
          Animal.update({id:animal.id},animal,function(data){
            console.log(data);
          });
        });

        },
        function (error) {
          console.log(error);
        });
      $scope.hide();
    }
  });
