'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearVentaCtrl
 * @description
 * # DialogsDialogoCrearVentaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearVentaCtrl', function ($scope, $mdDialog, Animal, Categoria, Raza, ServerData, Venta, Lote) {
    var obj = ServerData;
    console.log(obj);
    $scope.selectedAnimales = [];
    $scope.selectedLotes = [];
    if (obj.venta_seleccionada){
      $scope.editar = true;
      console.log("hola");
      $scope.newVenta = obj.venta_seleccionada;
      $scope.selectedAnimales = obj.venta_seleccionada.animales;
      $scope.selectedLotes = obj.venta_seleccionada.lotes;
      $scope.fecha_venta = new Date($scope.newVenta.fecha_venta);
    }else {
      $scope.editar = false;
      $scope.newVenta = {};
      $scope.fecha_venta = new Date();
    }
    $scope.seleccionDetalleVenta = [];
    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response;
    });

    $scope.razas = Raza.get(function (response) {
      $scope.razas = response;
    });


    $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:20, estado:'V',ordering: 'lote__nombre',page: 1};


    function successAnimales(animales) {
      $scope.animales = animales;
    }

    $scope.getAnimales = function () {
      console.log($scope.queryAnimales);
      $scope.promiseAnimales = Animal.get($scope.queryAnimales,successAnimales).$promise;
      $scope.selectedAnimales = [];
    };

    $scope.getAnimales();

    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};


    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes,successLotes).$promise;
      $scope.selectedLotes = [];
    };

    $scope.getLotes();

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };


    $scope.cargarDetalleVenta = function () {
      $scope.newVenta.tipo_venta = $scope.tipo_venta;
      $scope.newVenta.lotes = $scope.selectedLotes;
      $scope.newVenta.animales = $scope.selectedAnimales;
    };


    $scope.guardarVenta = function () {
      if ($scope.editar){
        $scope.newVenta.fecha_venta = $scope.fecha_venta.getFullYear() + '-'
          + $scope.fecha_venta.getMonth() + '-' + $scope.fecha_venta.getDate();
        Venta.update({id:$scope.newVenta.id},$scope.newVenta,function(data){
          $scope.newVenta = data;
          $mdDialog.hide($scope.newVenta);
        });
      }

      $scope.cargarDetalleVenta();
      console.log($scope.newVenta);

      $scope.newVenta.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      $scope.newVenta.fecha_venta = $scope.fecha_venta.getFullYear() + '-'
        + $scope.fecha_venta.getMonth() + '-' + $scope.fecha_venta.getDate();
      var nuevaVenta = new Venta($scope.newVenta);
      nuevaVenta.$save(function () {
          console.log('Venta realizada');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();
    }
  });
