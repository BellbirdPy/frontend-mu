'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:SanitacionCtrl
 * @description
 * # SanitacionCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('SanitacionCtrl', function ($scope,Evento,EventoEstablecimiento, Vacunacion, $mdDialog,$filter,ServerData,Utilidades) {
    var vacunacion = 0;

    Evento.get(function(response){
      $scope.eventos = response.results;
      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.eventos );
    });
    $scope.events = [];
    EventoEstablecimiento.get({'establecimiento':ServerData.establecimiento.id},function(response){
      $scope.eventos_establecimiento = response.results;
      angular.forEach($scope.eventos_establecimiento,function(evento){
        evento.color = '#8bc34a';
      });
      console.log($scope.eventos_establecimiento);
      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.eventos_establecimiento );
    });

    $scope.showAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Sanitación')
          .textContent(ev.title )
          .ariaLabel('Alert Dialog')
          .ok('OK!')
          .targetEvent(null)
      );
    };

    angular.element(('#calendar')).fullCalendar(
      {
        eventClick: function(calEvent, jsEvent, view) {
          if (calEvent.veterinario){

          var prueba = $filter('filter')($scope.eventos_establecimiento, { id: calEvent.id }, true)[0];

          $scope.agregarEvento(prueba);
          }
        },
        dayClick: function (date, jsEvent, view) {
          var eventoNuevo = {start:date,end:date,veterinario:'',establecimiento:ServerData.establecimiento.id,nombre:''};

          $scope.agregarEvento(eventoNuevo);

        },header:{
          left:   'prev',
          center: 'title',
          right:  'next'
        },
        dayNamesShort:["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"]

      }
    );


    $scope.agregarEvento = function(evento) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_evento.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','EventoEstablecimiento','$filter','ServerData' ,function ($scope, $mdDialog, EventoEstablecimiento,$filter,ServerData) {

          $scope.newEvento = {};
          if (evento) {
            if (evento.id) {
              $scope.newEvento = evento;
              $scope.newEvento.start = new Date(evento.start);
              $scope.newEvento.end = new Date(evento.end);
            } else {
              $scope.newEvento = evento;
              $scope.newEvento.start = new Date(evento.start);
              $scope.newEvento.end = new Date(evento.end);
            }
          }
          $scope.deleteEvento = function(evento) {
            var confirm = $mdDialog.confirm().title('Estas seguro de que quieres eliminar?')
              .textContent(evento.title)
              .ariaLabel('Eliminar Vacunación')
              .targetEvent(null)
              .ok('Sí, estoy seguro')
              .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
              EventoEstablecimiento.delete({id:evento.id},evento,function(data){
                angular.element(('#calendar')).fullCalendar( 'removeEvents', [evento.id] );
              });

            }, function() {
              console.log('Cancelaste');
            });
          };




          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (evento.id){
                console.log($scope.newEvento);
                EventoEstablecimiento.update({id:$scope.newEvento.id},$scope.newEvento,function(data){
                  $scope.newEvento = data;
                  $mdDialog.hide($scope.newEvento);
                });
              }else {
                $scope.newEvento.establecimiento = ServerData.establecimiento.id;
                var nuevo = new EventoEstablecimiento($scope.newEvento);

                nuevo.$save(function (data) {
                  angular.element(('#calendar')).fullCalendar( 'addEventSource', [data] );
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
          if (nuevo){
          if (nuevo !== true) {
            var prueba = $filter('filter')($scope.eventos_establecimiento, { id: nuevo.id }, true)[0];
            if (prueba){
              if (prueba.id === nuevo.id) {
                angular.extend(prueba, nuevo);
                angular.element(('#calendar')).fullCalendar( 'removeEvents', [nuevo.id] );
                angular.element(('#calendar')).fullCalendar( 'addEventSource', [nuevo] );
              }else{
                $scope.eventos_establecimiento.unshift(nuevo);
              }
            }else{
              $scope.eventos_establecimiento.unshift(nuevo);
            }

          }
          }

        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };



    $scope.queryVacunaciones = {establecimiento: ServerData.establecimiento.id,ordering: 'id',page: 1};
    $scope.selectedVacunaciones = [];

    function successVacunaciones(vacunaciones) {
      $scope.vacunaciones = vacunaciones;
      vacunacion =+1;
      angular.forEach(vacunaciones.results,function(vacunacion){
        $scope.events.push({title: 'Vacunación '+ vacunacion.enfermedad  + '. Lote: '+ vacunacion.lotes_completo[0].nombre,
          start: new Utilidades.toDate(vacunacion.fecha_vacunacion),allDay: true,color:'#2196f3'});
      });
      if (vacunacion<=1){

      angular.element(('#calendar')).fullCalendar( 'addEventSource', $scope.events );
      }

      console.log($scope.vacunaciones);
    }

    $scope.getVacunaciones = function () {
      $scope.promiseVacunaciones = Vacunacion.get($scope.queryVacunaciones,successVacunaciones).$promise;
      $scope.selectedVacunaciones = [];
    };

    $scope.getVacunaciones();

    $scope.abrirFormCarga = function (vacunacion) {
      ServerData.vacunacion_seleccionada = vacunacion;
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_crear_vacunacion.html',
        targetEvent: null,
        controller: 'DialogsDialogoCrearVacunacionCtrl'
      }).then(function () {
        $scope.getVacunaciones();
      });
    };

    $scope.deleteVacunacion = function(lista) {
      $mdDialog.show({
        templateUrl: 'views/dialogs/dialogo_eliminar_vacunacion.html',
        targetEvent: null,
        controller: ['$scope','$mdDialog','Vacunacion','$filter' ,function ($scope, $mdDialog, Vacunacion) {
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
          $scope.lista = lista;
          $scope.hide = function () {
            $mdDialog.hide();
          };

          $scope.cancel = function () {
            $mdDialog.cancel();
          };

          $scope.answer = function (answer) {
            if (answer === 'guardar'){
              if (lista.length >= 1){
                angular.forEach(lista, function(vacunacion){
                  Vacunacion.delete({id:vacunacion.id},vacunacion,function(data){
                    console.log("eliminado: " + data.fecha_vacunacion);
                  });
                });
              }
              $mdDialog.hide(lista);
            }else{
              $mdDialog.hide();
            }
          };

        }]
      })
        .then(function(lista) {
          if (lista !== true) {
            //$scope.getVacunaciones();
          }
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
    };

  });
