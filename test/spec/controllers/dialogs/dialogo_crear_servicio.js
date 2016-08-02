'use strict';

describe('Controller: DialogsDialogoCrearServicioCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoCrearServicioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoCrearServicioCtrl = $controller('DialogsDialogoCrearServicioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoCrearServicioCtrl.awesomeThings.length).toBe(3);
  });
});
