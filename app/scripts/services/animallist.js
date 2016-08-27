'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.AnimalList
 * @description
 * # AnimalList
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('AnimalList', function ($resource) {
    return $resource('http://127.0.0.1:8000/animal/:id/' ,null,{
      'update': { method:'PUT',isArray:true},
      'create': { method:'POST',isArray:true},
      'delete': {method:'DELETE',isArray:true}
    });
  });
