/**
 * Created by ruben on 08/08/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendmuApp.controller:DialogsDialogoCrearEgresoCtrl
 * @description
 * # DialogsDialogoCrearEgresoCtrl
 * Controller of the frontendmuApp
 */
angular.module('frontendmuApp')
  .controller('DialogsDialogoCrearEgresoCtrl', function ($scope, $mdDialog, ServerData, Egreso, Utilidades) {
    var obj = ServerData;
    $scope.rubros = [
      {c:'GD',display:'Gastos Directos',
        descripciones:['Sueldos y Jornales',
          'Manutención',
          'Gastos Sociales',
          'Bonificaciones',
          'Sanidad Animal',
          'Mineralización',
          'Gastos de Reproducción (Servicios)',
          'Suplementación Alimenticia',
          'Combustibles y Lubricantes',
          'Reparaciones y Mantemientos de Maquinarias y Equipos',
          'Mantenimiento de Instalaciones',
          'Servicios Públicos y Comunicación',
          'Movilidad',
          'Varios',
          'Imprevistos',
          'Agregar otro']},
      {c:'GA',display:'Gastos Administrativos',
        descripciones:[
          'Honorarios del Administrador',
          'Personal Administrativo',
          'Alquileres',
          'Servicios Públicos de Oficina',
          'Cuotas Sociales',
          'Asesoramiento Técnico',
          'Asistencia Contable',
          'Otros Gastos de Oficina',
          'Imprevistos',
          'Agregar otro'
        ]},
      {c:'IT',display:'Impuestos y Tazas',
        descripciones:[
          'Inmobiliario',
          'Otros',
          'Agregar otro'
        ]},
      {c:'GC', display:'Gastos de Comercialización',
        descripciones:[
          'Guías de Translado y Control de Marcas',
          'Transporte',
          'Comisiones',
          'Otros',
          'Agregar otro'
        ]},
      {c:'GF', display:'Gastos Financieros',
        descripciones:[
          'Intereses sobre Préstamos',
          'Otros Financieros',
          'Pago de Capital de Préstamos',
          'Agregar otro'
        ]}];

    if (obj.egreso_seleccionada){
      $scope.editar = true;
      $scope.newEgreso = obj.egreso_seleccionada;
      $scope.fecha = new Utilidades.toDate($scope.newEgreso.fecha);
    }else {
      $scope.editar = false;
      $scope.newEgreso = {};
      $scope.fecha = new Date();
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };





    $scope.guardarEgreso = function () {
      if(!angular.isUndefined($scope.form)){
        $scope.newEgreso.descripcion=$scope.form.descripcion;
      }
      if ($scope.editar){
        $scope.newEgreso.fecha = $scope.fecha.getFullYear() + '-'
          + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();

        Egreso.update({id:$scope.newEgreso.id},$scope.newEgreso,function(data){
          $scope.newEgreso = data;
          $mdDialog.hide($scope.newEgreso);
        });
      }else{

      console.log($scope.newEgreso);

      $scope.newEgreso.establecimiento = obj.establecimiento.id; //Esto se tieen que poner el establecimiento despues
      //Formateamos la fecha
      console.log()
      $scope.newEgreso.fecha = $scope.fecha.getFullYear() + '-'
        + ($scope.fecha.getMonth()+1) + '-' + $scope.fecha.getDate();
      console.log($scope.newEgreso.fecha)
      var nuevoEgreso = new Egreso($scope.newEgreso);
      nuevoEgreso.$save(function () {
          console.log('Egreso realizada');
        },
        function (error) {
          console.log(error);
        });
      $scope.hide();}
    }
  });
