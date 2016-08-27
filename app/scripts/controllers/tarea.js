'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:TareaCtrl
 * @description
 * # TareaCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('TareaCtrl', function ($scope, $filter, $mdDialog,  ServerData, Tarea) {

    $scope.queryTareas = {establecimiento: ServerData.establecimiento.id,limit:20, ordering: 'fecha',page: 1};
    $scope.selectedTareas = [];

    function successTareas(tareas) {
      $scope.tareas = tareas;
    }

    $scope.getTareas = function () {
      console.log($scope.queryTareas);
      $scope.promiseTareas = Tarea.get($scope.queryTareas,successTareas).$promise;
      $scope.selectedTareas = [];
    };

    $scope.getTareas();

    $scope.abrirFormCargaTarea = function (tarea) {
      ServerData.tarea_seleccionada = tarea;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_tarea.html',
        targetEvent: null,
        controller:'DialogsDialogoCrearTareaCtrl'
      }).then(function () {
        $scope.getTareas();
      });
    };
    $scope.deleteTarea = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_tarea.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Tarea','$filter' ,function ($scope, $mdDialog, Tarea) {
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
                angular.forEach(lista, function(tarea){
                  Tarea.delete({id:tarea.id},tarea,function(data){
                    console.log("eliminado: " + data.fecha_tarea);
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
            $scope.getTareas();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };
});
