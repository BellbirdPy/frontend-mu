'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:PotreroCtrl
 * @description
 * # PotreroCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('PotreroCtrl', function ($scope,Potrero,$mdDialog,$filter,ServerData) {
    $scope.potreros = [];

    Potrero.query({establecimiento:ServerData.establecimiento.id},function(response) {
      $scope.potreros = response;
    });


    $scope.deletePotrero = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      console.log(ev);
      var confirm = $mdDialog.confirm()
        .title('Estas seguro de que quieres eliminar?')
        .content('Nombre: '+ev.nombre + ' - ' +
        'Superficie: ' + ev.superficie + ' - ' +
        'Uso: ' + ev.uso )
        .ariaLabel('Delete potrero')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        Potrero.delete({id:ev.id},ev,function(data){
          console.log(data);
          $scope.potreros.splice($scope.potreros.indexOf(ev),1);
        });
      }, function() {
        $scope.status = 'Se eliminó correctamente.';

      });
    };

    $scope.cargarPotrero = function(potreroModificar) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_potrero.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Potrero','ServerData' ,function ($scope, $mdDialog, Potrero, ServerData) {
          $scope.newPotrero = {};
          if (potreroModificar) {
            $scope.newPotrero = potreroModificar;
          }else{
            $scope.newPotrero.nombre = "";
            $scope.newPotrero.superficie = "";
            $scope.newPotrero.uso = "";
            $scope.newPotrero.establecimiento = ServerData.establecimiento.id;
          }

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (potreroModificar){
                Potrero.update({id:$scope.newPotrero.id},$scope.newPotrero,function(data){
                  $scope.newPotrero = data;
                  $mdDialog.hide($scope.newPotrero);
                });

              }else {
                var nuevo = new Potrero($scope.newPotrero);

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
            var prueba = $filter('filter')($scope.potreros, { id: nuevo.id }, true)[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.potreros.unshift(nuevo);
              }
            }else{
              $scope.potreros.unshift(nuevo);
            }

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

  });