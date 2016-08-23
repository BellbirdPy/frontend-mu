'use strict';

describe('Controller: DialogsDialogoCrearParicionCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoCrearParicionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoCrearParicionCtrl = $controller('DialogsDialogoCrearParicionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoCrearParicionCtrl.awesomeThings.length).toBe(3);
  });
});
