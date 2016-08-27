'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearServicioCtrl
 * @description
 * # DialogsDialogoCrearServicioCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearServicioCtrl', function ($scope, $mdDialog, ServerData, Servicio, Lote, Animal,Pajuela,Utilidades,Raza,$filter) {
    var obj = ServerData;
    $scope.segundoPaso = false;
    $scope.tipos = [{simbolo:'N',nombre:'Monta Natural'},{simbolo:'I',nombre:'Inseminación Artificial'}];
    $scope.selectedLotes = [];
    $scope.selectedAnimales = [];
    $scope.status = '';
    $scope.pajuelaSelected = {};
    $scope.inseminaciones = [];
    var animalesPajuela = [];

    $scope.seleccionarPajuelaUnitario = function(animal){
      $scope.selectedAnimales.push(animal);
      $scope.cambiarPajuela(animal.pajuela);
    };

    $scope.cambiarPajuela = function (pajuela) {
      angular.forEach($scope.selectedAnimales,function (animal) {
        animal.pajuela = pajuela;
        var prueba = $filter('filter')(animalesPajuela,function (d) {return d.id.toString() === animal.id.toString();})[0];
        if (prueba) {
          if (prueba.id === animal.id) {
            animalesPajuela.splice(animalesPajuela.indexOf(prueba),1);
          }
        }
      });
      animalesPajuela = animalesPajuela.concat($scope.selectedAnimales);
      console.log(animalesPajuela);
      $scope.selectedAnimales = [];
      $scope.pajuelaSelected = {};

    };
    if (obj.servicio_seleccionada){
      $scope.editar = true;
      $scope.newServicio = obj.servicio_seleccionada;
      $scope.selectedLotes = [obj.servicio_seleccionada.lote_completo];
      $scope.fecha_inicio = Utilidades.toDate($scope.newServicio.fecha_inicio);
      $scope.fecha_fin = Utilidades.toDate($scope.newServicio.fecha_fin);
      $scope.selectedAnimales = obj.servicio_seleccionada.toros;
    }else {
      $scope.editar = false;
      $scope.newServicio = {tipo:'N'};
      $scope.fecha_fin = new Date();
      $scope.fecha_inicio = new Date();
    }

    //---------------------------------RAZA--------------------//
    $scope.queryRazas = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};


    function successRazas(razas) {
      $scope.razas = razas;
    }

    $scope.getRazas = function () {
      $scope.promiseRazas = Raza.get($scope.queryRazas,successRazas).$promise;
    };

    $scope.getRazas();

    //---------------------------------LOTES--------------------//
    $scope.queryLotes = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};


    function successLotes(lotes) {
      $scope.lotes = lotes;
    }

    $scope.getLotes = function () {
      $scope.promiseLotes = Lote.get($scope.queryLotes,successLotes).$promise;
    };

    $scope.getLotes();

    //---------------------------------PAJUELAS------------------//
    $scope.queryPajuelas = {establecimiento: ServerData.establecimiento.id,limit:20,ordering: '-id',page: 1};


    function successPajuelas(pajuelas) {
      if (pajuelas.count > $scope.queryPajuelas.limit){
        $scope.queryPajuelas.limit = pajuelas.count;
        $scope.getPajuelas();
      }else {
        $scope.pajuelas = pajuelas;
      }
    }

    $scope.getPajuelas = function () {
      $scope.promisePajuelas = Pajuela.get($scope.queryPajuelas,successPajuelas).$promise;
    };

    $scope.getPajuelas();

    //---------------------------------TOROS--------------------//

    $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:20,estado:'V',categoria__codigo:'TORO',ordering: 'id',page: 1};


    function successAnimales(animales) {
      $scope.animales = animales;
      angular.forEach(animalesPajuela,function(animalPajuela){
        var prueba = $filter('filter')($scope.animales.results,function (d) {return d.id.toString() === animalPajuela.id.toString();})[0];
        if (prueba) {
          if (prueba.id === animalPajuela.id) {
            angular.extend(prueba, animalPajuela);
          }
        }
      });


    }

    $scope.getAnimales = function () {
      $scope.promiseAnimales = Animal.get($scope.queryAnimales,successAnimales).$promise;
    };

    $scope.getAnimales();



    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };


    $scope.cargarDetalleServicio = function () {
      $scope.newServicio.lote = $scope.selectedLotes[0].id;
      $scope.newServicio.toros = $scope.selectedAnimales;
      $scope.newServicio.inseminaciones = [];
    };

    $scope.cargarInseminaciones = function(){
      if (animalesPajuela.length < $scope.animales.count){
        return false;
      }
      angular.forEach(animalesPajuela, function(animal){
        if (animal.pajuela != ''){
          $scope.inseminaciones.push({animal:animal.id,pajuela:animal.pajuela});
        }else{
          return false;
        }
      });
      var mes=0;
      mes = $scope.fecha_inicio.getMonth() + 1;
      var fecha = $scope.fecha_inicio.getFullYear() + '-'
        + mes + '-' + $scope.fecha_inicio.getDate();
      $scope.newServicio.inseminaciones = [{fecha:fecha,detalles:$scope.inseminaciones,establecimiento:obj.establecimiento.id}];
      $scope.newServicio.toros = [];
      return true;

    };

    $scope.logPaginate = function () {
      console.log('paginate');
    };

    $scope.inseminar = function(){
      $scope.selectedAnimales = [];
      $scope.segundoPaso = true;
      $scope.newServicio.lote = $scope.selectedLotes[0].id;
      console.log($scope.pajuelas);
      if ($scope.pajuelas.count == 0){
        $scope.status = 'No dispone de ninguna pajuela en el stock. Por favor cargue en el sistema. (Configuración -> Stock de pajuelas)';
        $scope.segundoPaso = false;
      }else{
        $scope.animales = {};
        $scope.queryAnimales = {establecimiento: ServerData.establecimiento.id,limit:20,estado:'V',categoria__is_hembra:true,lote:$scope.newServicio.lote,ordering: 'id',page: 1};
        $scope.getAnimales();
      }

    };



    $scope.guardarServicio = function () {
      $scope.status = '';
      if ($scope.newServicio.tipo == 'N'){
        $scope.cargarDetalleServicio();
      }else{
        if ($scope.cargarInseminaciones() == false){
          $scope.status = 'Todos los animales deben ser inseminados';
          return false;
        }
      }
      if ($scope.newServicio.lote == null){
        $scope.status = 'Debe selecionar un lote.';
        return;
      }
      if ($scope.newServicio.toros.length < 1 && $scope.newServicio.tipo == 'N'){
        $scope.status = 'Debe selecionar al menos un toro.';
        return;
      }

      var currentMonth = 0;
      console.log($scope.editar);
      if ($scope.editar == true){
        currentMonth = $scope.fecha_inicio.getMonth() + 1;
        $scope.newServicio.fecha_inicio = $scope.fecha_inicio.getFullYear() + '-'
          + currentMonth + '-' + $scope.fecha_inicio.getDate();
        currentMonth = $scope.fecha_fin.getMonth() + 1;
        $scope.newServicio.fecha_fin = $scope.fecha_fin.getFullYear() + '-'
          + $scope.fecha_fin.getMonth() + '-' + $scope.fecha_fin.getDate();
        Servicio.update({id:$scope.newServicio.id},$scope.newServicio,function(data){
          $scope.newServicio = data;
        });
        $mdDialog.hide($scope.newServicio);
      }else {

        console.log($scope.newServicio);

        $scope.newServicio.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
        //Formateamos la fecha
        currentMonth = $scope.fecha_inicio.getMonth() + 1;
        $scope.newServicio.fecha_inicio = $scope.fecha_inicio.getFullYear() + '-'
          + currentMonth + '-' + $scope.fecha_inicio.getDate();
        currentMonth = $scope.fecha_fin.getMonth() + 1;
        $scope.newServicio.fecha_fin = $scope.fecha_fin.getFullYear() + '-'
          + currentMonth + '-' + $scope.fecha_fin.getDate();
        var nuevaServicio = new Servicio($scope.newServicio);
        nuevaServicio.$save(function () {
            console.log('Servicio realizada');
          },
          function (error) {
            console.log(error);
          });
      }
      $scope.hide();
    }
  });
