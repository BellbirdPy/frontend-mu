'use strict';

/**
 * @ngdoc overview
 * @name frontendmuApp
 * @description
 * # frontendmuApp
 *
 * Main module of the application.
 */
angular
  .module('frontendmuApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
  ])
  .config(function ($routeProvider,$mdThemingProvider,$httpProvider,$resourceProvider) {
    // CSRF Support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // This only works in angular 3!
    // It makes dealing with Django slashes at the end of everything easier.
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('lime', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus(true);
          }]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus();
          }]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus(true);
          }]
        }
      })
      .when('/inventario', {
        templateUrl: 'views/inventario.html',
        controller: 'InventarioCtrl',
        controllerAs: 'inventario',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus(true);
          }]
        }
      })
      .when('/establecimiento', {
        templateUrl: 'views/establecimiento.html',
        controller: 'EstablecimientoCtrl',
        controllerAs: 'establecimiento',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus(true);
          }]
        }
      })
      .when('/potrero', {
        templateUrl: 'views/potrero.html',
        controller: 'PotreroCtrl',
        controllerAs: 'potrero',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus(true);
          }]
        }
      })
      .when('/nutricion', {
        templateUrl: 'views/nutricion.html',
        controller: 'NutricionCtrl',
        controllerAs: 'nutricion',
        resolve: {
          authenticated: ['DjangoAuth', function(DjangoAuth){
            return DjangoAuth.authenticationStatus(true);
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(DjangoAuth){
    DjangoAuth.initialize('//localhost:8000/rest-auth', false);
  });;
