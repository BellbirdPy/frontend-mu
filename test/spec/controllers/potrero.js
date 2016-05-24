'use strict';

describe('Controller: PotreroCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var PotreroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PotreroCtrl = $controller('PotreroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PotreroCtrl.awesomeThings.length).toBe(3);
  });
});
