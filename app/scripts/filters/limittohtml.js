'use strict';

/**
 * @ngdoc filter
 * @name frontendmuApp.filter:limittohtml
 * @function
 * @description
 * # limittohtml
 * Filter in the frontendmuApp.
 */
angular.module('frontendmuApp').filter("limitHtml",
  function(  ) {
    // Return the directive configuration.
    return function(text, limit) {

      var changedString = String(text).replace(/<[^>]+>/gm, '');
      var length = changedString.length;
      if (length > limit){
        changedString = changedString.substr(0, limit - 1);
        return changedString.concat('...');
      }else{
        return changedString;
      }

    }
  });
