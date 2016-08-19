'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearPalpacionCtrl
 * @description
 * # DialogsDialogoCrearPalpacionCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearPalpacionCtrl', function ($scope, $mdDialog, ServerData, Palpacion, LoteAnimalCompleto) {
    var obj = ServerData;

    $scope.tipos = [{simbolo:'N',nombre:'Monta Natural'},{simbolo:'I',nombre:'Inseminación Artificial'}]
    $scope.selectedAnimales = [];
    if (obj.servicio_seleccionada){
      $scope.servicio = obj.servicio_seleccionada;
    }

    if (obj.palpacion_seleccionada){
      $scope.editar = true;
      $scope.newPalpacion = obj.palpacion_seleccionada;
      $scope.fecha = new Date($scope.newPalpacion.fecha);
    }else {
      $scope.editar = false;
      $scope.newPalpacion = {};
      $scope.fecha= new Date();
    }
    $scope.animales = [];
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,filter:100,servicio:$scope.servicio.id,ordering: 'id',page: 1};


    function successLotes(lotes) {
      $scope.lotes = lotes;
      console.log(lotes);
      angular.forEach(lotes.results,function (lote) {
        console.log(lote);
        $scope.animales.concat(lote.animales_completo);
        console.log($scope.animales);
      });
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = LoteAnimalCompleto.get($scope.queryLotes,successLotes).$promise;
      $scope.selectedAnimales = [];
    };

    $scope.getLotes();

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };


    $scope.cargarDetallePalpacion = function () {
      $scope.newPalpacion.detalles = [];
      angular.forEach($scope.selectedAnimales,function (animal) {
        animal.prenado = true;
      });
      angular.forEach($scope.lotes.results[0].animales_completo,function (animal) {
        if (animal.prenado == true){
        $scope.newPalpacion.detalles.push({animal:animal.id,resultado:true});
        }else{
          $scope.newPalpacion.detalles.push({animal:animal.id,resultado:false});
        }
      });



    };


    $scope.guardarPalpacion = function () {

      $scope.cargarDetallePalpacion();
      console.log($scope.newPalpacion);
      $scope.newPalpacion.servicio = $scope.servicio.id;
      $scope.newPalpacion.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      $scope.newPalpacion.fecha = $scope.fecha.getFullYear() + '-'
        + $scope.fecha.getMonth() + '-' + $scope.fecha.getDate();
      var nuevaPalpacion = new Palpacion($scope.newPalpacion);
      nuevaPalpacion.$save(function () {
          console.log('Palpacion realizada');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();
    }
  });
