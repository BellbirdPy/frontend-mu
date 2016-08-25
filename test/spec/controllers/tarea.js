'use strict';

describe('Controller: TareaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var TareaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TareaCtrl = $controller('TareaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TareaCtrl.awesomeThings.length).toBe(3);
  });
});
