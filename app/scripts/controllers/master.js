'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('MasterCtrl', function ($scope, $location, DjangoAuth, ServerData) {
    $scope.obj = ServerData;
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    $scope.logout = function(){
      $location.path('/logout/');
    };

    // Wait for the status of authentication, set scope var to true if it resolves
    DjangoAuth.authenticationStatus(true).then(function(){
      $scope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      $scope.authenticated = false;
      $location.path('/login/');
    });
    // Wait and respond to the log in event.
    $scope.$on('djangoAuth.logged_in', function() {
      $scope.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection);
      $location.path('/login/');
    });
  });
