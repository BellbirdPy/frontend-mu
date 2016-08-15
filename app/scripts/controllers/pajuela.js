'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:PajuelaCtrl
 * @description
 * # PajuelaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('PajuelaCtrl', function ($scope,Pajuela,$mdDialog,$filter,ServerData) {

    $scope.queryPajuelas = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};
    $scope.selectedPajuelas = [];

    function successPajuelas(pajuelas) {
      $scope.pajuelas = pajuelas;
      console.log($scope.pajuelas);
    }

    $scope.getPajuelas = function () {
      $scope.promisePajuelas = Pajuela.get($scope.queryPajuelas,successPajuelas).$promise;
      $scope.selectedPajuelas = [];
    };

    $scope.getPajuelas();


    $scope.deletePajuela = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_pajuela.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Pajuela','$filter' ,function ($scope, $mdDialog, Pajuela) {
          $scope.options = {
            pageSelect: true
          };
          $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
          };

          $scope.query = {
            limit: 20,
            page: 1
          };
          $scope.lista = lista;
          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                angular.forEach(lista, function(pajuela){
                  Pajuela.delete({id:pajuela.id},pajuela,function(data){
                    console.log("Eliminado: " + data.nombre);
                  });
                });
              }
              $mdDialog.hide(lista);
            }else{
              $mdDialog.hide();
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getPajuelas();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.editPajuela = function(pajuelaModificar) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_pajuela.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Pajuela','ServerData' ,function ($scope, $mdDialog, Pajuela, ServerData) {
          $scope.newPajuela = {};
          if (pajuelaModificar) {
            $scope.newPajuela = pajuelaModificar;
          }else{
            $scope.newPajuela.nombre = "";
            $scope.newPajuela.descripcion = "";
            $scope.newPajuela.establecimiento = ServerData.establecimiento.id;
          }

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (pajuelaModificar){
                Pajuela.update({id:$scope.newPajuela.id},$scope.newPajuela,function(data){
                  $scope.newPajuela = data;
                  $mdDialog.hide($scope.newPajuela);
                });

              }else {
                var nuevo = new Pajuela($scope.newPajuela);

                nuevo.$save(function () {

                }, function (error) {
                  console.log(error);
                });
                $mdDialog.hide(nuevo);
              }
            }
          };

        }]
      })
        .then(function(nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.pajuelas.results, function (d) {return d.id.toString() === nuevo.id.toString();})[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.pajuelas.results.unshift(nuevo);
              }
            }else{
              $scope.pajuelas.results.unshift(nuevo);
            }

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

  });
