'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DashboardCtrl', function ($scope,Evento,EventoEstablecimiento,$mdDialog,$filter,ServerData, Tarea, Servicio) {

    $scope.checked=false;

    $scope.notificar = function (){
      if ($scope.checked===false){
        $scope.checked=true;
      }else{
        $scope.checked=false;
      }
    };

    $scope.queryTareas = {establecimiento: ServerData.establecimiento.id,limit:20, ordering: 'fecha',page: 1,leido:'False'};

    function successTareas(tareas) {
      $scope.tareas = tareas;
    }

    $scope.getTareas = function () {
      console.log($scope.queryTareas);
      $scope.promiseTareas = Tarea.get($scope.queryTareas,successTareas).$promise;
    };

    $scope.getTareas();


    var fecha = new Date(Date.now());
    var fecha_hoy = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate();
    fecha.setDate(fecha.getDate() + 15);
    var fecha_15 = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate();
    $scope.queryServicios = {establecimiento: ServerData.establecimiento.id,limit:20, ordering: 'fecha',page: 1,
    fecha_hoy: fecha_hoy, fecha_15: fecha_15 };

    function successServicios(servicios) {
      $scope.servicios = servicios;
    }

    $scope.getServicios = function () {
      console.log($scope.queryServicios);
      $scope.promiseServicios = Servicio.get($scope.queryServicios,successServicios).$promise;
    };
    $scope.getServicios();


    Evento.query(function(response){
      $scope.eventos = response;
      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.eventos );
    });

    EventoEstablecimiento.query({'establecimiento':ServerData.establecimiento.id},function(response){
      $scope.eventos_establecimiento = response;
      console.log($scope.eventos_establecimiento);
      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.eventos_establecimiento );
    });

    angular.element(('#calendar')).fullCalendar({});


  });
