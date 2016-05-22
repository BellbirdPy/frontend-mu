'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:InventarioCtrl
 * @description
 * # InventarioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('InventarioCtrl', function ($scope,$filter,$mdDialog,Animal,Lote, ServerData) {
    var obj = ServerData;
    $scope.animales = [];
    $scope.lotes = [];
    $scope.sortType     = 'caravana'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchAnimal   = '';     // set the default search/filter term
    $scope.searchAnimalLote = '';
    $scope.selection = [];
    $scope.selectionLote = [];
    $scope.selectionCant = 0;
    $scope.selectedAll = false;
    $scope.cargandoAnimal = false;
    $scope.cargandoLote = false;

    Animal.query({establecimiento:obj.establecimiento.id},function(response) {
      $scope.animales = response;
      $scope.cargandoAnimal = true;
    });

    Lote.query({establecimiento:obj.establecimiento.id},function(response){
      $scope.lotes = response;
      $scope.cargandoLote = true;
    });

    $scope.updateLote = function(){
      Lote.query({establecimiento:obj.establecimiento.id},function(response){
        $scope.lotes = response;
        $scope.cargandoLote = true;
      });
    };

    $scope.updateAnimal = function(){
      Animal.query({establecimiento:obj.establecimiento.id},function(response) {
        $scope.animales = response;
        $scope.cargandoAnimal = true;
      });
    };

    $scope.filterPorLote = function(animal) {
      if ($scope.selectionLote.length > 0) {
        if (animal.lote) {
          if ($scope.selectionLote.indexOf(animal.lote.toString()) === -1) {
            return false;
          }
        }else{
          return false;
        }
      }
      return true;
    };

    $scope.filterPorSearch = function(animal){
      if (animal.caravana.toLowerCase().indexOf($scope.searchAnimal) > -1){
        return true;
      }
      if (animal.carimbo.toString().toLowerCase().indexOf($scope.searchAnimal) > -1){
        return true;
      }
      if (animal.categoria_nombre.toLowerCase().indexOf($scope.searchAnimal) > -1){
        return true;
      }
      if (animal.raza_nombre.toLowerCase().indexOf($scope.searchAnimal) > -1){
        return true;
      }
      return false;

    }

    $scope.selectAll = function () {
      angular.forEach($scope.animales, function (animal) {
        animal.selected = $scope.selectedAll;
        var id = $scope.selection.indexOf(animal.id);
        if (id === -1) {
          if ($scope.selectedAll){
            $scope.selection.push(animal.id);
          }
        }else{
          if (!$scope.selectedAll){
            $scope.selection.splice(id,1);
          }
        }
      });
      $scope.verificarMensaje();
    };

    $scope.toggleLote = function (loteId) {
      var id = $scope.selectionLote.indexOf(loteId.toString());
      $scope.searchAnimalLote = id;
      if (id === -1){
        $scope.selectionLote.push(loteId.toString());
      }else{
        $scope.selectionLote.splice(id,1);
      }
    };

    $scope.toggle = function (animalId) {
      var id = $scope.selection.indexOf(animalId);
      if (id === -1){
        $scope.selection.push(animalId);
      }else{
        $scope.selection.splice(id,1);
      }
      $scope.verificarMensaje();
    };

    $scope.verificarMensaje = function(){
      if ($scope.selection.length ===1){
        $scope.mensaje = 'animal seleccionado';
      }else if ($scope.selection.length >1){
        $scope.mensaje = 'animales seleccionados';
      }else {
        $scope.mensaje='';
      }
      var cant = $scope.selection.length;
      if (cant > 0) {
        $scope.selectionCant = $scope.selection.length;
      }else{
        $scope.selectionCant = '';
      }
    };

    $scope.changeLote = function(lote){

      if (lote.selected){
        lote.selected = false;
        $scope.toggleLote(lote.id);
      }else{
        lote.selected = true;
        $scope.toggleLote(lote.id);
      }
    };

    $scope.change = function(animal){
      if (animal.selected){
        animal.selected = false;
        $scope.toggle(animal.id);
      }else{
        animal.selected = true;
        $scope.toggle(animal.id);
      }
    };

    $scope.deleteAnimal = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app]
      var animalEliminar = $filter('filter')($scope.animales, { id: $scope.selection[0] }, true)[0];
      console.log(animalEliminar);
      var confirm = $mdDialog.confirm().title('Estas seguro de que quieres eliminar?')
        .textContent(animalEliminar.categoria_nombre + '- Caravana: '+animalEliminar.caravana + ' - Raza: ' + animalEliminar.raza_nombre + ' - Carimbo: ' + animalEliminar.carimbo)
        .ariaLabel('Eliminar Animal')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        Animal.delete({id:animalEliminar.id},animalEliminar,function(data){
          $scope.updateLote();
        });
      }, function() {
       console.log('Cancelaste');
      });
    };

    $scope.deleteLote = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      $scope.loteSeleccionado2 = $filter('filter')($scope.lotes, { id: $scope.selectionLote[0] }, false)[0];
      var confirm = $mdDialog.confirm()
        .title('Estas seguro de que quieres eliminar?')
        .content('Lote: '+$scope.loteSeleccionado2.nombre + '<br>' +
        'Potrero: ' + $scope.loteSeleccionado2.potrero_nombre + '<br>' +
        'Cantidad de animales: ' + $scope.loteSeleccionado2.animales.length + '<br>' )
        .ariaLabel('Lucky day')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        Lote.delete({id:ev},$scope.loteSeleccionado2,function(data){
          console.log(data);
        });
        $scope.lotes.splice($scope.lotes.indexOf($scope.loteSeleccionado2),1);
        $scope.selectionLote = [];
        $scope.updateAnimal();
      }, function() {
        $scope.status = 'Se eliminó correctamente.';

      });
    };

    $scope.cargarDetalle = function(animalId){
      var animalSeleccionado = $filter('filter')($scope.animales, { id: animalId }, true)[0];
      $scope.cargar(animalSeleccionado);
    };

    $scope.cargarDetalleRecategorizar = function (){
      var lista = [];
      angular.forEach($scope.selection, function (animal){
        var animalSeleccionado = $filter('filter')($scope.animales, { id: animal }, true)[0];
        lista.push(animalSeleccionado);
      });
      $scope.cargarRecategorizar(lista);
    };

    $scope.cargarDetalleMortandad = function (){
      var lista = [];
      angular.forEach($scope.selection, function (animal){
        var animalSeleccionado = $filter('filter')($scope.animales, { id: animal }, true)[0];
        lista.push(animalSeleccionado);
      });
      $scope.cargarMortandad(lista);
    };

    $scope.cargarDetalleLote = function(loteId){
      var loteSeleccionado = $filter('filter')($scope.lotes, { id: parseInt(loteId)  }, true)[0];

      $scope.cargarLote(loteSeleccionado);
    };

    $scope.cargarDetalleMudar = function (){
      var lista = [];
      angular.forEach($scope.selection, function (animal){
        var animalSeleccionado = $filter('filter')($scope.animales, { id: animal }, true)[0];
        lista.push(animalSeleccionado);
      });
      $scope.cargarMudar(lista);
    };

    $scope.cargar = function(animalSeleccionado) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_animal.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Animal','Categoria','Raza','Lote' ,function ($scope, $mdDialog, Animal, Categoria,Raza, Lote) {
          $scope.categorias =[];
          $scope.razas = [];
          $scope.lotes = [];

          $scope.lotes = Lote.query({establecimiento:obj.establecimiento.id},function(response){
            $scope.lotes = response;
          });

          $scope.categorias = Categoria.query(function(response){
            $scope.categorias = response;
          });

          $scope.razas = Raza.query(function(response){
            $scope.razas = response;
          });

          $scope.newAnimal = {};

          if (animalSeleccionado) {
            $scope.newAnimal = animalSeleccionado;
          }

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (animalSeleccionado){
                console.log($scope.newAnimal);
                Animal.update({id:$scope.newAnimal.id},$scope.newAnimal,function(data){
                  $scope.newAnimal = data;
                  $mdDialog.hide($scope.newAnimal);
                });

              }else {
                $scope.newAnimal.estado = "V";
                $scope.newAnimal.establecimiento = obj.establecimiento.id;
                var nuevo = new Animal($scope.newAnimal);

                nuevo.$save(function () {

                }, function (error) {
                  console.log(error);
                });
                $mdDialog.hide(nuevo);
              }
            }
          };

        }]
      })
        .then(function(nuevo) {
          console.log(nuevo);
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.animales, { id: nuevo.id }, true)[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.animales.unshift(nuevo);
              }
            }else{
              $scope.animales.unshift(nuevo);
            }

          }
          $scope.updateLote();
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.cargarLote = function(loteSeleccionado) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Potrero' ,function ($scope, $mdDialog, Potrero) {
          $scope.potreros =[];

          $scope.potreros = Potrero.query({establecimiento:obj.establecimiento.id},function(response){
            $scope.potreros = response;
          });

          $scope.newLote = {};
          if (loteSeleccionado) {
            $scope.newLote = loteSeleccionado;
          }else{
            $scope.newLote.potrero = "";
            $scope.newLote.cantidad = 0;
            $scope.newLote.peso_promedio = 0;
            $scope.newLote.establecimiento = obj.establecimiento.id;
            $scope.newLote.animales = [];
          }

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (loteSeleccionado){
                Lote.update({id:$scope.newLote.id},$scope.newLote,function(data){
                  $scope.newLote = data;
                  $mdDialog.hide($scope.newLote);
                });

              }else {
                var nuevo = new Lote($scope.newLote);

                nuevo.$save(function () {

                }, function (error) {
                  console.log(error);
                });
                $mdDialog.hide(nuevo);
              }
            }
          };

        }]
      })
        .then(function(nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.lotes, { id: nuevo.id }, true)[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.lotes.unshift(nuevo);
              }
            }else{
              $scope.lotes.unshift(nuevo);
            }

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.agruparEnLote = function(animales) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Potrero' ,function ($scope, $mdDialog, Potrero) {
          $scope.potreros =[];

          $scope.potreros = Potrero.query({establecimiento:obj.establecimiento.id},function(response){
            $scope.potreros = response;
          });

          $scope.newLote = {};
          $scope.newLote.potrero = "";
          $scope.newLote.cantidad = 0;
          $scope.newLote.peso_promedio = 0;
          $scope.newLote.establecimiento = obj.establecimiento.id;
          $scope.newLote.animales = [];

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
                var nuevo = new Lote($scope.newLote);

                nuevo.$save(function (result) {
                  result.animales = animales;
                  console.log($scope.selection);
                  Lote.update({id:result.id},result,function(data){
                    console.log(data);
                  });

                }, function (error) {
                  console.log(error);
                });
                $mdDialog.hide(nuevo);

            }
          };

        }]
      })
        .then(function(nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.lotes, { id: nuevo.id }, true)[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.lotes.unshift(nuevo);
              }
            }else{
              $scope.lotes.unshift(nuevo);
            }

          }
          $scope.updateLote();
          $scope.updateAnimal();
          $scope.selection = [];
          $scope.verificarMensaje();
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.cargarMortandad = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mortandad.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Animal','Mortandad','ServerData' ,function ($scope, $mdDialog, Animal, Mortandad,ServerData) {

          $scope.form = {};

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                var listaId = []
                angular.forEach(lista, function(animalSeleccionado){
                  listaId.push(animalSeleccionado.id);
                  animalSeleccionado.estado = 'M';
                  Animal.update({id:animalSeleccionado.id},animalSeleccionado,function(data){
                  });
                });
                var nuevo = new Mortandad($scope.form);
                nuevo.establecimiento = ServerData.establecimiento.id;
                nuevo.animales = [];
                nuevo.$save(function (result) {
                  result.animales = listaId;
                  Mortandad.update({id:result.id},result,function(data){
                    console.log(data);
                  });
                }, function (error) {
                  console.log(error);
                });

                $mdDialog.hide(lista);
              }
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            angular.forEach(lista,function(nuevo){
              var prueba = $filter('filter')($scope.animales, { id: nuevo.id }, true)[0];
              if (prueba){
                if (prueba.id === nuevo.id) {
                  angular.extend(prueba, nuevo);
                }
              }
            });

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.cargarRecategorizar = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_recategorizar.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Categoria','Animal','$filter' ,function ($scope, $mdDialog, Categoria, Animal,$filter) {
          $scope.categorias =[];

          $scope.categorias = Categoria.query(function(response){
            $scope.categorias = response;
          });

          $scope.form = {};


          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                angular.forEach(lista, function(animalSeleccionado){

                  animalSeleccionado.categoria = $scope.form.categoria;
                  Animal.update({id:animalSeleccionado.id},animalSeleccionado,function(data){
                    console.log(data);
                  });
                  var id = $scope.form.categoria;
                  console.log(id);
                  console.log($scope.categorias);
                  var categoria_nombre = $filter('filter')($scope.categorias, { id: id})[0];
                  console.log(categoria_nombre);
                  animalSeleccionado.categoria_nombre = categoria_nombre.nombre;
                });
                $mdDialog.hide(lista);
              }
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            angular.forEach(lista,function(nuevo){
              var prueba = $filter('filter')($scope.animales, { id: nuevo.id }, true)[0];
              console.log(prueba);
              if (prueba){
                if (prueba.id === nuevo.id) {
                  angular.extend(prueba, nuevo);
                }
              }
            });

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.cargarMudar = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mudar.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Lote','Animal','$filter' ,function ($scope, $mdDialog, Lote, Animal, $filter) {
          $scope.lotes =[];

          $scope.lotes = Lote.query({establecimiento:obj.establecimiento.id},function(response){
            $scope.lotes = response;
          });

          $scope.form = {};


          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                angular.forEach(lista, function(animalSeleccionado){
                  animalSeleccionado.lote = $scope.form.lote;
                  Animal.update({id:animalSeleccionado.id},animalSeleccionado,function(data){
                    console.log(data);
                  });
                  var id = $scope.form.lote;
                  console.log(id);
                  console.log($scope.lotes);
                  var lote = $filter('filter')($scope.lotes, { id: id})[0];
                  console.log(lote);
                  animalSeleccionado.lote_nombre = lote.nombre;
                });
                $mdDialog.hide(lista);
              }
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            angular.forEach(lista,function(nuevo){
              var prueba = $filter('filter')($scope.animales, { id: nuevo.id }, true)[0];
              if (prueba){
                if (prueba.id === nuevo.id) {
                  nuevo.selected = true;
                  angular.extend(prueba, nuevo);
                }
              }
            });
            $scope.updateLote();

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


  });
