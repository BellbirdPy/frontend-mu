'use strict';

describe('Controller: ContabilidadCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var ContabilidadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContabilidadCtrl = $controller('ContabilidadCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContabilidadCtrl.awesomeThings.length).toBe(3);
  });
});
