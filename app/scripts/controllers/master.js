'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('MasterCtrl', function ($scope, $location) {
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    $scope.logout = function(){
      $location.path('/logout/');
    };
    
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection);
      $location.path('/login/');
    });
  });
