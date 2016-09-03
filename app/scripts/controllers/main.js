'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('MainCtrl', function ($scope, ServerData, Establecimiento, $location,$rootScope, Noticia,$sce,$mdDialog) {
    $scope.establecimientos = [];
    $scope.obj = ServerData;
    $scope.noticias = [];
    Establecimiento.get(function(response){
      $scope.establecimientos = response.results;
      console.log($scope.establecimientos.length);
      if ($scope.establecimientos.length == 0){
        $mdDialog.show({
          templateUrl: 'views/dialogs/dialogo_agregar_establecimiento.html',
          controller: 'DialogsDialogoAgregarEstablecimientoCtrl'
        });
      }
    });



    $scope.seleccionar = function(e){
      $scope.obj.establecimiento = e;
      $rootScope.establecimiento = e;
      if ($scope.obj.establecimiento.potreros.length)
      {
        $location.path('/dashboard/');
      }else{
      $location.path('/mensaje_inicial/');
      }
    };

    Noticia.get({},function(data){
      angular.forEach(data.results,function (item){
        item.texto = $sce.trustAsHtml(item.texto);
      });
      $scope.noticias = data.results;

    });

    $scope.verNoticia = function(noticia) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_noticia.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog' ,function ($scope, $mdDialog) {

          $scope.noticia = noticia;
          $scope.cancel = function () {
            $mdDialog.cancel();
          };

        }]
      });
    };




  });
