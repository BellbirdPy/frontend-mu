'use strict';

describe('Controller: DialogsDialogoAgregarEstablecimientoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoAgregarEstablecimientoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoAgregarEstablecimientoCtrl = $controller('DialogsDialogoAgregarEstablecimientoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoAgregarEstablecimientoCtrl.awesomeThings.length).toBe(3);
  });
});
