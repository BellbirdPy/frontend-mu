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

    // DialogsDialogoEditarCrearLoteCtrl
    $scope.editLote = function (loteSeleccionado) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: 'DialogsDialogoEditarCrearLoteCtrl',
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
      //DialogsDialogoArchivo
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_archivo.html',
        targetEvent: null,
        controller: 'DialogsDialogoArchivoCtrl',
        locals: {
          $scope: $scope,
          result: result
        }
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
    };

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
