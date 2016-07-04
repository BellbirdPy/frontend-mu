'use strict';

/**
 * @ngdoc directive
 * @name frontendmuApp.directive:menuToggle
 * @description
 * # menuToggle
 */
angular.module('frontendmuApp')
  .directive('menuToggle', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the menuToggle directive');
      }
    };
  });
