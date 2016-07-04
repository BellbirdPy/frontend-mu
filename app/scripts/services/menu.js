'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Menu
 * @description
 * # Menu
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Menu', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
