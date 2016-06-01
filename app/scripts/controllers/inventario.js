'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:InventarioCtrl
 * @description
 * # InventarioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('InventarioCtrl', function ($scope, $filter, $mdDialog, $mdMedia, $controller, Animal, Lote, ServerData, Categoria, Raza) {
    var obj = ServerData;
    $scope.estados_sanitarios = [
      {c: 'E', display: 'En fecha'},
      {c: 'N', display: 'No esta en fecha'},
      {c: 'D', display: 'En fecha'}
    ];

    $scope.categorias = Categoria.get(function (response) {
      $scope.categorias = response;
    });
    $scope.razas = Raza.get(function (response) {
      $scope.razas = response;
    });

    $scope.options = {
      boundaryLinks: false,
      pageSelect: true
    };


    //-----------------------------------ANIMALES---------------------------------------------------
    $scope.queryAnimales = {
      establecimiento: ServerData.establecimiento.id,
      estado: 'V',
      ordering: 'lote__nombre',
      page: 1
    };
    $scope.selectedAnimales = [];

    function successAnimales(animales) {
      $scope.animales = animales;
    }

    $scope.getAnimales = function () {
      $scope.promiseAnimales = Animal.get($scope.queryAnimales, successAnimales).$promise;
      $scope.selectedAnimales = [];
    };

    $scope.getAnimales();

    // DialogsDialogoAnimalCtrl
    $scope.editAnimal = function (animalSeleccionado) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_animal.html',
        targetEvent: null,
        controller: 'DialogsDialogoAnimalCtrl',
        locals: {
          $scope: $scope,
          animalSeleccionado: animalSeleccionado
        }
      })
        .then(function (nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.animales.results, function (d) {
              return d.id.toString() === nuevo.id.toString();
            })[0];
            if (prueba) {
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              } else {
                $scope.animales.results.unshift(nuevo);
              }
            } else {
              $scope.animales.results.unshift(nuevo);
            }

          }
          $scope.getLotes();
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.deleteAnimal = function (animalSeleccionado) {
      // Appending dialog to document.body to cover sidenav in docs app]
      var confirm = $mdDialog.confirm().title('Estas seguro de que quieres eliminar?')
        .textContent(animalSeleccionado.categoria_nombre + '- Caravana: ' + animalSeleccionado.caravana + ' - Raza: '
          + animalSeleccionado.raza_nombre + ' - Carimbo: ' + animalSeleccionado.carimbo)
        .ariaLabel('Eliminar Animal')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function () {
        Animal.delete({id: animalSeleccionado.id}, animalSeleccionado, function (data) {
          $scope.getLotes();
          var prueba = $filter('filter')($scope.animales.results, function (d) {
            return d.id.toString() === animalSeleccionado.id.toString();
          })[0];
          $scope.animales.results.shift(prueba);
        });
      }, function () {
        console.log('Cancelaste');
      });
    };

    // DialogsDialogoEliminarAnimal
    $scope.deleteListaAnimal = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_animal.html',
        targetEvent: null,
        controller: 'DialogsDialogoEliminarAnimalCtrl',
        locals: {
          lista: lista
        }
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getAnimales();
            $scope.getLotes();
          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    // DialogsDialogoMudarAnimal
    $scope.mudarAnimales = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mudar_animal.html',
        targetEvent: null,
        controller: 'DialogsDialogoMudarAnimalCtrl',
        locals: {
          lista: lista
        }
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getLotes();
            angular.forEach(lista, function (nuevo) {
              var prueba = $filter('filter')($scope.animales.results, function (d) {
                return d.id.toString() === nuevo.id.toString();
              })[0];
              if (prueba) {
                if (prueba.id === nuevo.id) {
                  angular.extend(prueba, nuevo);
                }
              }
            });


          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    // DialogsDialogoRecategorizarAnimalCtrl
    $scope.recategorizar = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_recategorizar_animal.html',
        targetEvent: null,
        controller: 'DialogsDialogoRecategorizarAnimalCtrl',
        locals: {
          lista: lista
        }
      })
        .then(function (lista) {
          if (lista !== true) {
            angular.forEach(lista, function (nuevo) {
              var prueba = $filter('filter')($scope.animales.results, function (d) {
                return d.id.toString() === nuevo.id.toString();
              })[0];
              if (prueba) {
                if (prueba.id === nuevo.id) {
                  angular.extend(prueba, nuevo);
                }
              }
            });

          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    // DialogsDialogoLoteCtrl
    $scope.agruparEnLote = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: 'DialogsDialogoLoteCtrl',
        locals: {
          lista: lista
        }
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getLotes();
            angular.forEach(lista, function (nuevo) {
              var prueba = $filter('filter')($scope.animales.results, function (d) {
                return d.id.toString() === nuevo.id.toString();
              })[0];
              if (prueba) {
                if (prueba.id === nuevo.id) {
                  angular.extend(prueba, nuevo);
                }
              }
            });

          }

        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };
    // Dialogs/DialogoMortandadCtrl
    $scope.mortandad = function (lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mortandad.html',
        targetEvent: null,
        controller: 'DialogsDialogoMortandadCtrl',
        locals: {
          lista: lista
        }
      })
        .then(function (lista) {
          if (lista !== true) {
            $scope.getAnimales();
          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    //-----------------------------------LOTES---------------------------------------------------
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id, ordering: 'nombre', page: 1};
    $scope.selectedLotes = [];

    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes, successLotes).$promise;
      $scope.selectedLotes = [];
    };

    $scope.getLotes();

    $scope.deleteLote = function (lote) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Estas seguro de que quieres eliminar?')
        .content('Lote: ' + lote.nombre + ' - ' +
          'Potrero: ' + lote.potrero_nombre + ' - ' +
          'Cantidad de animales: ' + lote.animales.length)
        .ariaLabel('Lucky day')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function () {
        Lote.delete({id: lote.id}, lote, function (data) {
          console.log(data);
        });
        $scope.lotes.results.splice($scope.lotes.results.indexOf(lote), 1);
        $scope.selectedLotes = []
      }, function () {
        $scope.status = 'Se eliminó correctamente.';

      });
    };

    // DialogsDialogoEditarLoteCtrl
    $scope.editLote = function (loteSeleccionado) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: 'DialogsDialogoEditarLoteCtrl',
        locals: {
          loteSeleccionado: loteSeleccionado
        }
      })
        .then(function (nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.lotes.results, function (d) {
              return d.id.toString() === nuevo.id.toString();
            })[0];
            if (prueba) {
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              } else {
                $scope.lotes.results.unshift(nuevo);
              }
            } else {
              $scope.lotes.results.unshift(nuevo);
            }

          }
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


    //------------------------------------MANEJO DE ARCHIVOS---------------
    var X = XLSX;
    $scope.archivo = {};
    $scope.cargarArchivo = function (result) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_archivo.html',
        targetEvent: null,
        controller: ['$scope', '$mdDialog', 'Animal', 'ServerData', function ($scope, $mdDialog, Animal, ServerData) {


          $scope.options = {
            pageSelect: true
          };
          $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
          }

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
              animal.estado_sanitario = 'E'
              animal.estado_sanitario_display = 'En fecha'
            } else if (animal.estado_sanitario.toString() === 'No esta en fecha') {
              animal.estado_sanitario = 'N'
              animal.estado_sanitario_display = 'No esta en fecha'
            } else if (animal.estado_sanitario.toString() === 'Desconocido') {
              animal.estado_sanitario = 'D'
              animal.estado_sanitario_display = 'Desconocido'
            } else {
              animal.estado_sanitario = 'E'
              animal.estado_sanitario_display = 'En fecha'
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

        }]
      })
        .then(function () {
          $scope.getAnimales();
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    var to_json = function (workbook) {
      var result = {};
      var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
      if (roa.length > 0) {
        result = roa;
      }
      $scope.cargarArchivo(result);
      $scope.model = {};
    }

    $scope.handleFile = function (e) {
      console.log(e);

      var files = [e.file];
      var i, f;
      for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
          var data = e.target.result;

          var workbook = X.read(data, {type: 'binary'});
          console.log('ok');
          to_json(workbook);

          /* DO SOMETHING WITH workbook HERE */

        };
        reader.readAsBinaryString(f);
      }
    }


  });
