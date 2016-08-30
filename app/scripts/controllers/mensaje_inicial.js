'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:MensajeInicialCtrl
 * @description
 * # MensajeInicialCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('MensajeInicialCtrl', function ($scope, $location) {
    $scope.empezar = function(){
        $scope.iniciado= true;
        $location.path('/establecimiento/');

    };
  });
