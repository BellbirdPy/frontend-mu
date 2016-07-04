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
    'ngMaterial',
    'md.data.table',
    'ur.file',
    'ngMaterialSidemenu'
  ])
  .config(function ($routeProvider,$mdThemingProvider,$httpProvider,$resourceProvider,$interpolateProvider) {
    // Force angular to use square brackets for template tag
    // The alternative is using {% verbatim %}
    $interpolateProvider.startSymbol('[[').endSymbol(']]');    // CSRF Support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // This only works in angular 3!
    // It makes dealing with Django slashes at the end of everything easier.
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('light-green', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: '/views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/inventario', {
        templateUrl: '/views/inventario.html',
        controller: 'InventarioCtrl',
        controllerAs: 'inventario'
      })
      .when('/establecimiento', {
        templateUrl: '/views/establecimiento.html',
        controller: 'EstablecimientoCtrl',
        controllerAs: 'establecimiento'
      })
      .when('/potrero', {
        templateUrl: '/views/potrero.html',
        controller: 'PotreroCtrl',
        controllerAs: 'potrero'
      })
      .when('/nutricion', {
        templateUrl: '/views/nutricion.html',
        controller: 'NutricionCtrl',
        controllerAs: 'nutricion'
      })
      .when('/sanitacion', {
        templateUrl: '/views/sanitacion.html',
        controller: 'SanitacionCtrl',
        controllerAs: 'sanitacion'
      })
      .when('/dashboard', {
        templateUrl: '/views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
