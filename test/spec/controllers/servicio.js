'use strict';

describe('Controller: ServicioCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var ServicioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServicioCtrl = $controller('ServicioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ServicioCtrl.awesomeThings.length).toBe(3);
  });
});
