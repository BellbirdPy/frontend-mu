'use strict';

describe('Controller: NutricionCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var NutricionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NutricionCtrl = $controller('NutricionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});
