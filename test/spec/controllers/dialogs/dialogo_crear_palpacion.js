'use strict';

describe('Controller: DialogsDialogoCrearPalpacionCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoCrearPalpacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoCrearPalpacionCtrl = $controller('DialogsDialogoCrearPalpacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoCrearPalpacionCtrl.awesomeThings.length).toBe(3);
  });
});
