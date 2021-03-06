'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('MasterCtrl', function ($scope, $location, $route, ServerData, Establecimiento, Menu, $rootScope, $timeout, $mdSidenav, Utilidades, $mdDialog) {
    var menu = Menu;
    var vm = this;
    $scope.toggleLeft = buildDelayedToggler('left');
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            console.log("toggle " + navID + " is done");
          });
      }, 200);
    }

    $scope.establecimientos = [];
    $scope.obj = ServerData;

    Establecimiento.get(function (data) {
      $scope.establecimientos = data.results;
    });

    $scope.seleccionar = function (e) {
      $scope.obj.establecimiento = e;
      $rootScope.establecimiento = e;
      $location.path('/inventario/');
    };


    //functions for menu-link and menu-toggle
    vm.isOpen = isOpen;
    vm.toggleOpen = toggleOpen;
    vm.autoFocusContent = false;
    vm.menu = menu;

    vm.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
    function isOpen(section) {
      return menu.isSectionSelected(section);
    }

    function toggleOpen(section) {
      menu.toggleSelectSection(section);
    }

    $scope.vm = vm;





    $scope.agregarEstablecimiento = function () {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_agregar_establecimiento.html',
        controller: 'DialogsDialogoAgregarEstablecimientoCtrl',
        locals: {
          Inicial: false,
          Modificar:false
        }
      }).then(function (value) {
        if (value) {
          $location.path('/');
          $route.reload();
        } else {
          Utilidades.showSimpleToast('No se ha podido crear el establecimiento');
        }
      });
    }
  });
