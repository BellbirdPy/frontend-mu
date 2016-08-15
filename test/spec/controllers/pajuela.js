'use strict';

describe('Controller: PajuelaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var PajuelaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PajuelaCtrl = $controller('PajuelaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PajuelaCtrl.awesomeThings.length).toBe(3);
  });
});
