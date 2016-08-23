'use strict';

describe('Controller: EgresoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var EgresoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EgresoCtrl = $controller('EgresoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EgresoCtrl.awesomeThings.length).toBe(3);
  });
});
