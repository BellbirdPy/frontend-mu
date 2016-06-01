'use strict';

describe('Controller: DialogsDialogoRecategorizarAnimalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoRecategorizarAnimalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoRecategorizarAnimalCtrl = $controller('DialogsDialogoRecategorizarAnimalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoRecategorizarAnimalCtrl.awesomeThings.length).toBe(3);
  });
});
