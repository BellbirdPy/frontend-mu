'use strict';

describe('Controller: EstablecimientoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var EstablecimientoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EstablecimientoCtrl = $controller('EstablecimientoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EstablecimientoCtrl.awesomeThings.length).toBe(3);
  });
});
