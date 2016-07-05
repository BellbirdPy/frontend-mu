'use strict';

describe('Controller: SanitacionCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var SanitacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SanitacionCtrl = $controller('SanitacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});
