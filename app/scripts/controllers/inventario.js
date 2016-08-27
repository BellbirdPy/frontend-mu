'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:InventarioCtrl
 * @description
 * # InventarioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('InventarioCtrl', function ($scope,$filter,$mdDialog,$mdMedia,Animal,Lote, ServerData,Categoria,Raza,Mortandad,Establecimiento,AnimalList,Utilidades) {
    var obj = ServerData;
    $scope.estados_sanitarios = [{c:'E',display:'En fecha'},{c:'N',display:'No esta en fecha'},{c:'D',display:'En fecha'}];

    $scope.categorias = Categoria.get(function(response){
      $scope.categorias = response;
    });
    $scope.razas = Raza.get(function(response){
      $scope.razas = response;
    });

    $scope.options = {
      boundaryLinks: false,
      pageSelect: true
    };


    //-----------------------------------ANIMALES---------------------------------------------------
    $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:20, estado:'V',ordering: 'lote__nombre',page: 1};
    $scope.selectedAnimales = [];

    function successAnimales(animales) {
      $scope.animales = animales;
    }

    $scope.getAnimales = function () {
      $scope.promiseAnimales = Animal.get($scope.queryAnimales,successAnimales).$promise;
      $scope.selectedAnimales = [];
    };

    $scope.getAnimales();

    $scope.editAnimal = function(animalSeleccionado) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_animal.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Animal','Categoria','Raza','Lote' ,function ($scope, $mdDialog, Animal, Categoria,Raza, Lote) {
          $scope.categorias =[];
          $scope.razas = [];
          $scope.lotes = [];

          $scope.lotes = Lote.get({establecimiento:obj.establecimiento.id,estado:'N'},function(response){
            $scope.lotes = response.results;
          });

          $scope.categorias = Categoria.get(function(response){
            $scope.categorias = response.results;
          });

          $scope.razas = Raza.get(function(response){
            $scope.razas = response.results;
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
                Animal.update({id:$scope.newAnimal.id},$scope.newAnimal,function(data){
                  $scope.newAnimal = data;
                  Utilidades.showSimpleToast('Se modificó correctamente!');
                  $mdDialog.hide($scope.newAnimal);
                },function(error){
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });
              }else {
                $scope.newAnimal.estado = "V";
                $scope.newAnimal.establecimiento = obj.establecimiento.id;
                var nuevo = new Animal($scope.newAnimal);

                nuevo.$save(function () {
                  Utilidades.showSimpleToast('Se creó correctamente!');

                }, function (error) {
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });
                $mdDialog.hide(nuevo);
              }
            }
          };

        }]
      })
        .then(function(nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.animales.results, function (d) {return d.id.toString() === nuevo.id.toString();})[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.animales.results.unshift(nuevo);
              }
            }else{
              $scope.animales.results.unshift(nuevo);
            }

          }
          $scope.getLotes();
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.deleteAnimal = function(animalSeleccionado) {
      // Appending dialog to document.body to cover sidenav in docs app]

      var confirm = $mdDialog.confirm().title('Estas seguro de que quieres eliminar?')
        .textContent(animalSeleccionado.categoria_nombre + '- Caravana: '+animalSeleccionado.caravana + ' - Raza: ' + animalSeleccionado.raza_nombre + ' - Carimbo: ' + animalSeleccionado.carimbo)
        .ariaLabel('Eliminar Animal')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        Animal.delete({id:animalSeleccionado.id},animalSeleccionado,function(data){
          $scope.getLotes();
          var prueba = $filter('filter')($scope.animales.results, function (d) {return d.id.toString() === animalSeleccionado.id.toString();})[0];
          $scope.animales.results.shift(prueba);
        });
      }, function() {
        console.log('Cancelaste');
      });
    };

    $scope.deleteListaAnimal = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Animal','$filter' ,function ($scope, $mdDialog, Animal,$filter) {
          $scope.lista = lista;
          lista[0].estado = 'E';
          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                angular.forEach(lista, function(animalSeleccionado) {
                  animalSeleccionado.estado = 'E';
                });
                $scope.cargando = true;
                AnimalList.update({'animales':lista}, function(){
                  $mdDialog.hide(lista);
                  Utilidades.showSimpleToast('Se eliminaron correctamente!');
                },function(error){
                  console.log(error);
                  $scope.cargando = false;
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });
              }
            }else{
              $mdDialog.hide(lista);
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getAnimales();
            $scope.getLotes();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.mudarAnimales = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mudar.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Lote','Animal','$filter' ,function ($scope, $mdDialog, Lote, Animal, $filter) {
          $scope.lotes =[];
          $scope.lotes = Lote.get({establecimiento:obj.establecimiento.id,estado:'N'},function(response){
            $scope.lotes = response.results;
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
                angular.forEach(lista, function(animalSeleccionado) {
                  animalSeleccionado.lote = $scope.form.lote;
                });
                AnimalList.update({'animales':lista},function(data){
                  Utilidades.showSimpleToast('Se mudaron correctamente!');
                },function(error){
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });
                $mdDialog.hide(lista);
              }
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getLotes();
            $scope.getAnimales();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.recategorizar = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_recategorizar.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Categoria','Animal','$filter' ,function ($scope, $mdDialog, Categoria, Animal,$filter) {
          $scope.categorias =[];

          $scope.categorias = Categoria.get(function(response){
            $scope.categorias = response.results;
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
                angular.forEach(lista, function(animalSeleccionado) {
                  animalSeleccionado.categoria = $scope.form.categoria;
                });
                AnimalList.update({'animales':lista},function(data){
                  Utilidades.showSimpleToast('Se recategorizaron correctamente!');
                },function(error){
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });

                $mdDialog.hide(lista);
              }
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getLotes();
            $scope.getAnimales();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.agruparEnLote = function(lista) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Potrero','ServerData' ,function ($scope, $mdDialog, Potrero,ServerData) {
          $scope.potreros =[];

          $scope.potreros = Potrero.get({establecimiento:ServerData.establecimiento.id,lote:''},function(response){
            $scope.potreros = response.results;
          });

          $scope.newLote = {};
          $scope.newLote.potrero = "";
          $scope.newLote.cantidad = 0;
          $scope.newLote.peso_promedio = 0;
          $scope.newLote.establecimiento = ServerData.establecimiento.id;
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
                if (lista.length >= 1){
                  angular.forEach(lista, function(animalSeleccionado){
                    animalSeleccionado.lote = nuevo.id;
                  });
                  AnimalList.update({'animales':lista},function(data){
                    Utilidades.showSimpleToast('Se agruparon correctamente!');
                  },function(error){
                    console.log(error);
                    Utilidades.showSimpleToast('Ocurrió un error!');
                  });
                  $mdDialog.hide(lista);
                }

              }, function (error) {
                console.log(error);
                Utilidades.showSimpleToast('Ocurrió un error!');
              });
              $mdDialog.hide(lista);

            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getLotes();
            $scope.getAnimales();
          }

        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    $scope.mortandad = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mortandad.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Animal','Mortandad','ServerData' ,function ($scope, $mdDialog, Animal, Mortandad,ServerData) {

          $scope.newMortandad = {};

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                var listaId = [];
                angular.forEach(lista, function(animalSeleccionado){
                  listaId.push(animalSeleccionado.id);
                });
                var nuevo = new Mortandad($scope.form);
                nuevo.establecimiento = ServerData.establecimiento.id;
                nuevo.animales = listaId;
                nuevo.$save(function (result) {
                  Utilidades.showSimpleToast('Se registro mortandad correctamente!');
                }, function (error) {
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });

                $mdDialog.hide(lista);
              }
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            $scope.getAnimales();
            $scope.getLotes();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

    //-----------------------------------LOTES---------------------------------------------------
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,estado: 'N',ordering: 'id',page: 1};
    $scope.selectedLotes = [];

    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes,successLotes).$promise;
      $scope.selectedLotes = [];
    };

    $scope.getLotes();

    $scope.deleteLote = function(lote) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Estas seguro de que quieres eliminar?')
        .content('Lote: '+lote.nombre + ' - ' +
        'Potrero: ' + lote.potrero_nombre + ' - ' +
        'Cantidad de animales: ' + lote.animales.length )
        .ariaLabel('Lucky day')
        .targetEvent(null)
        .ok('Sí, estoy seguro')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        Lote.delete({id:lote.id},lote,function(){
          Utilidades.showSimpleToast('Se elimino correctamente!');
        },function(error){
          console.log(error);
          Utilidades.showSimpleToast('Ocurrió un error!');
        });
        $scope.lotes.results.splice($scope.lotes.results.indexOf(lote),1);
        $scope.selectedLotes = [];
      });
    };

    $scope.editLote = function(loteSeleccionado) {

      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_lote.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Potrero','ServerData','Establecimiento' ,function ($scope, $mdDialog, Potrero,ServerData,Establecimiento) {
          $scope.potreros =[];

          $scope.potreros = Potrero.get({establecimiento:ServerData.establecimiento.id },function(response){
            $scope.potreros = response.results;
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
                Lote.update({id:$scope.newLote.id},$scope.newLote,function(){
                  Utilidades.showSimpleToast('Se modificó correctamente!');
                },function(error){
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });

              }else {
                var nuevo = new Lote($scope.newLote);
                nuevo.$save(function () {
                  Utilidades.showSimpleToast('Se creo correctamente!');
                }, function (error) {
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });
                $mdDialog.hide(nuevo);
              }
            }
          };

        }]
      })
        .then(function(nuevo) {
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.lotes.results,function (d) {return d.id.toString() === nuevo.id.toString();})[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
              }else{
                $scope.lotes.results.unshift(nuevo);
              }
            }else{
              $scope.lotes.results.unshift(nuevo);
            }

          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };


    //------------------------------------MORTANDAD Y ABIGEO---------------

    $scope.editMortandad = function(mortandad) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_mortandad.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Animal','Mortandad' ,function ($scope, $mdDialog, Animal, Mortandad) {
          $scope.hola = 'hola';
          $scope.form = {};
          if (mortandad) {
            $scope.form = mortandad;
            $scope.form.fecha = new Date(mortandad.fecha);
          }

          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (mortandad){

                Mortandad.update({id:$scope.form.id},$scope.form,function(data){
                  Utilidades.showSimpleToast('Se modificó correctamente!');
                }, function (error) {
                  console.log(error);
                  Utilidades.showSimpleToast('Ocurrió un error!');
                });
              }
            }
          };

        }]
      })
        .then(function(nuevo) {
          console.log(nuevo);
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };




  });
