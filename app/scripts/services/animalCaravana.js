'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.AnimalCaravana
 * @description
 * # AnimalCaravana
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('AnimalCaravana', function ($resource) {
    return $resource('http://127.0.0.1:8000/animal/list_caravana/:id/' ,null);
  });
