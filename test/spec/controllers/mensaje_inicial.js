'use strict';

describe('Controller: MensajeInicialCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var MensajeInicialCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MensajeInicialCtrl = $controller('MensajeInicialCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MensajeInicialCtrl.awesomeThings.length).toBe(3);
  });
});
