'use strict';

/**
 * @ngdoc service
 * @name frontendmuApp.Noticia
 * @description
 * # Noticia
 * Factory in the frontendmuApp.
 */
angular.module('frontendmuApp')
  .factory('Noticia', function ($resource) {
    return $resource('http://127.0.0.1:8000/api/noticia/:id/',null,{
      'update': { method:'PUT' },
      'delete': {method:'DELETE'}
    });
  });

