'use strict';

describe('Controller: DialogsDialogoCrearVentaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoCrearVentaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoCrearVentaCtrl = $controller('DialogsDialogoCrearVentaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoCrearVentaCtrl.awesomeThings.length).toBe(3);
  });
});
