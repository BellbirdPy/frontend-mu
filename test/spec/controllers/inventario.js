'use strict';

describe('Controller: InventarioCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var InventarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventarioCtrl = $controller('InventarioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});
