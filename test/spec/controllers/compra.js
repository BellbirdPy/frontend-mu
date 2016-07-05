'use strict';

describe('Controller: CompraCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var CompraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompraCtrl = $controller('CompraCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});
