'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:MiembroCtrl
 * @description
 * # MiembroCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('MiembroCtrl', function ($scope,Miembro,$mdDialog,$filter,ServerData) {

    $scope.queryMiembros = {establecimientos: ServerData.establecimiento.id,ordering: 'id',page: 1};
    $scope.selectedMiembros = [];

    function successMiembros(miembros) {
      $scope.miembros = miembros;
      console.log($scope.miembros);
    }

    $scope.getMiembros = function () {
      $scope.promiseMiembros = Miembro.get($scope.queryMiembros,successMiembros).$promise;
      $scope.selectedMiembros = [];
    };



    $scope.deleteMiembro = function(lista) {
      $mdDialog.show({
          templateUrl: 'views/dialogs/dialogo_eliminar_miembro.html',
          targetEvent: null,
          controller: ['$scope','$mdDialog','Miembro','$filter' ,function ($scope, $mdDialog, Miembro) {
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
                  angular.forEach(lista, function(miembro){
                    Miembro.delete({id:miembro.id},miembro,function(data){
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
            $scope.getMiembros();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.editMiembro = function(miembroModificar) {

      $mdDialog.show({
          templateUrl: 'views/dialogs/dialogo_crear_miembro.html',
          targetEvent: null,
          controller: ['$scope','$mdDialog','Miembro','ServerData' ,function ($scope, $mdDialog, Miembro, ServerData) {
            $scope.newMiembro = {};
            if (miembroModificar) {
              $scope.newMiembro = miembroModificar;
            }else{
              $scope.newMiembro.username = "";
              $scope.newMiembro.first_name = "";
              $scope.newMiembro.last_name = "";
              $scope.newMiembro.email = "";
              $scope.newMiembro.cargo = "";
              $scope.newMiembro.establecimiento = ServerData.establecimiento.id;
            }

            $scope.hide = function () {
              $mdDialog.hide();
            };

            $scope.cancel = function () {
              $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
              $mdDialog.hide();

              if (answer === 'guardar'){
                if (miembroModificar){
                  Miembro.update({id:$scope.newMiembro.id},$scope.newMiembro,function(data){
                    $scope.newMiembro = data;
                    $mdDialog.hide($scope.newMiembro);
                  });

                }else {
                  var nuevo = new Miembro($scope.newMiembro);

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
          $scope.getMiembros();
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.miembros.results, function (d) {return d.id.toString() === nuevo.id.toString();})[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.miembros.results.unshift(nuevo);
              }
            }else{
              $scope.miembros.results.unshift(nuevo);
            }

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

  });
