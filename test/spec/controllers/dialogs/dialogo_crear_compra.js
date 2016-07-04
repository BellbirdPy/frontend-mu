'use strict';

describe('Controller: DialogsDialogoCrearCompraCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoCrearCompraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoCrearCompraCtrl = $controller('DialogsDialogoCrearCompraCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoCrearCompraCtrl.awesomeThings.length).toBe(3);
  });
});
