'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoArchivoCtrl
 * @description
 * # DialogsDialogoArchivoCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoArchivoCtrl', function ($scope, $mdDialog, Animal, ServerData, result) {


    $scope.options = {
      pageSelect: true
    };
    $scope.logPagination = function (page, limit) {
      console.log('page: ', page);
      console.log('limit: ', limit);
    };

    $scope.query = {
      limit: 20,
      page: 1
    };

    $scope.archivo = result;
    var categorias = {'1': 'Toro', '2': 'Vaca', '3': 'Desmamante', '4': 'Ternero'};
    var razas = {'1': 'Brahman', '2': 'Angus', '3': 'Brangus', '4': 'Nelore'};

    var rename = function (obj, oldName, newName) {
      // Do nothing if the names are the same
      if (oldName == newName) {
        return obj;
      }
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
      return obj;
    };
    angular.forEach($scope.archivo, function (animal) {
      animal = rename(animal, 'Caravana', 'caravana');
      animal = rename(animal, 'Carimbo', 'carimbo');
      animal = rename(animal, 'Categoria', 'categoria');
      animal = rename(animal, 'Raza', 'raza');
      animal = rename(animal, 'Peso especifico', 'peso_especifico');
      animal = rename(animal, 'Estado sanitario', 'estado_sanitario');
      animal.estado = 'V';
      animal.establecimiento = ServerData.establecimiento.id;
      if (animal.estado_sanitario.toString() === 'En fecha') {
        animal.estado_sanitario = 'E';
        animal.estado_sanitario_display = 'En fecha';
      } else if (animal.estado_sanitario.toString() === 'No esta en fecha') {
        animal.estado_sanitario = 'N';
        animal.estado_sanitario_display = 'No esta en fecha';
      } else if (animal.estado_sanitario.toString() === 'Desconocido') {
        animal.estado_sanitario = 'D';
        animal.estado_sanitario_display = 'Desconocido';
      } else {
        animal.estado_sanitario = 'E';
        animal.estado_sanitario_display = 'En fecha';
      }
      animal.raza_nombre = razas[animal.raza];
      animal.categoria_nombre = categorias[animal.categoria];
    });

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      if (answer === 'guardar') {
        angular.forEach($scope.archivo, function (animal) {
          var nuevo = new Animal(animal);
          console.log(nuevo);

          nuevo.$save(function () {

          }, function (error) {
            console.log(error);
          });
        });
        $mdDialog.hide();
      }
    };
  });
