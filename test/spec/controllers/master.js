'use strict';

describe('Controller: MasterCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var MasterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterCtrl = $controller('MasterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MasterCtrl.awesomeThings.length).toBe(3);
  });
});
