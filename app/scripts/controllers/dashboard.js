'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DashboardCtrl', function ($scope,Utilidades,Evento,EventoEstablecimiento,$mdDialog,$filter,ServerData, Tarea, Servicio,$http,$q,$timeout) {
    $scope.events = [];
    $scope.tareas_calendario = [];
    $scope.checked=false;

    $scope.notificar = function (){
      if ($scope.checked===false){
        $scope.checked=true;
      }else{
        $scope.checked=false;
      }
    };

    $scope.queryTareas = {establecimiento: ServerData.establecimiento.id,limit:20, ordering: 'fecha',page: 1};

    function successTareas(tareas) {
      angular.forEach(tareas.results,function(tarea){
        $scope.tareas_calendario.push({title: 'Tarea: ' + tarea.descripcion,
          start: Utilidades.toDate(tarea.fecha),end: Utilidades.toDate(tarea.fecha),allDay: true});

        angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.tareas_calendario );
      });
      $scope.tareas = tareas;
    }

    $scope.getTareas = function () {
      console.log($scope.queryTareas);
      $scope.promiseTareas = Tarea.get($scope.queryTareas,successTareas).$promise;
    };

    $scope.getTareas();


    $scope.fecha = new Date(Date.now());
    $scope.queryServicios = {establecimiento: ServerData.establecimiento.id,limit:20, ordering: 'fecha',page: 1};

    function successServicios(servicios) {
      angular.forEach(servicios.results,function(servicio){
        $scope.events.push({title: 'Servicio ' + servicio.tipo_display + '. Lote: '+ servicio.lote_completo.nombre,
          start: new Date(servicio.fecha_inicio),end: new Date(servicio.fecha_fin),allDay: true});

        angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.events );
      });
      console.log($scope.eventSources);
      $scope.servicios = servicios;
    }

    $scope.getServicios = function () {
      console.log($scope.queryServicios);
      $scope.promiseServicios = Servicio.get($scope.queryServicios,successServicios).$promise;
    };
    $scope.getServicios();


    Evento.get(function(response){
      $scope.eventos = response;
      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.eventos );
    });

    EventoEstablecimiento.get({'establecimiento':ServerData.establecimiento.id},function(response){
      $scope.eventos_establecimiento = response;
      console.log($scope.eventos_establecimiento);
      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.eventos_establecimiento );
    });


    angular.element(('#calendar')).fullCalendar({
      header:{
        left:   'prev',
        center: 'title',
        right:  'next'
      },dayNamesShort:["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"],
      googleCalendarApiKey: 'AIzaSyAg-BXo7AgcqlpvLaQiKl00yrxAhl6gznE',
      events: {
        googleCalendarId: '9dehs6s7f6hpmpgotp2gm3kg1g@group.calendar.google.com',
        color:'#F44336'
      }
    });


    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    };

    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.tooltips = true;
    $scope.setDayContent = function(date) {

      // You would inject any HTML you wanted for
      // that particular date here.
      return "<p></p>";

      // You could also use an $http function directly.
      return $http.get("/some/external/api");

      // You could also use a promise.
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve("<p></p>");
      }, 1000);
      return deferred.promise;

    };

  });
