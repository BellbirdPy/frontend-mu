'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoAgregarEstablecimientoCtrl
 * @description
 * # DialogsDialogoAgregarEstablecimientoCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoAgregarEstablecimientoCtrl', function ($scope, $mdDialog, Inicial, Departamento,Utilidades, Establecimiento, Modificar) {

    $scope.inicial = Inicial;
    console.log($scope.inicial);

    Departamento.get(function (response) {
      $scope.departamentos = response;
    });

    if (Modificar.id){
      console.log(Modificar);
      $scope.newEstablecimiento = Modificar;
    }


    $scope.planes = [
      {id: "P", nombre: "Premium"},
      {id: "E", nombre: "Estandar"},
      {id: "G", nombre: "Educativo"}
    ];


    $scope.guardar = function () {
      console.log('Fue presionado guardar');
      if (!$scope.newEstablecimiento.id){
        $scope.newEstablecimiento.estado = "A";
        var nuevoEstablecimiento = new Establecimiento($scope.newEstablecimiento);
        nuevoEstablecimiento.$save(function () {
          $mdDialog.hide(true);
        },function () {
          $mdDialog.hide(false);
        });
      }else{
        console.log('entro');

        Establecimiento.update({id:$scope.newEstablecimiento.id},$scope.newEstablecimiento,function (data) {
          console.log(data);
          Utilidades.showSimpleToast('Se modificó correctamente!');
          $mdDialog.hide(true);
        },function(error){
          console.log(error);
          Utilidades.showSimpleToast('Ocurrió un error!');
          $mdDialog.hide(false);
        });
      }

    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    }
  });
