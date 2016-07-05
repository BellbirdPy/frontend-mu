'use strict';

describe('Controller: VentaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var VentaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VentaCtrl = $controller('VentaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VentaCtrl.awesomeThings.length).toBe(3);
  });
});
