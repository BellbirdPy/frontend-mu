'use strict';

/**
 * @ngdoc directive
 * @name frontendmuApp.directive:menuLink
 * @description
 * # menuLink
 */
angular.module('frontendmuApp')
  .directive('menuLink', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the menuLink directive');
      }
    };
  });
