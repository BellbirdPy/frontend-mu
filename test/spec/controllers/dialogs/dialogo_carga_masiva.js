'use strict';

describe('Controller: DialogsDialogoCargaMasivaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoCargaMasivaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoCargaMasivaCtrl = $controller('DialogsDialogoCargaMasivaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoCargaMasivaCtrl.awesomeThings.length).toBe(3);
  });
});
