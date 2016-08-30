'use strict';

describe('Controller: GeneticaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var GeneticaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GeneticaCtrl = $controller('GeneticaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GeneticaCtrl.awesomeThings.length).toBe(3);
  });
});
