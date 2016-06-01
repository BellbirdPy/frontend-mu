'use strict';

describe('Controller: DialogsDialogoEliminarAnimalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoEliminarAnimalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoEliminarAnimalCtrl = $controller('DialogsDialogoEliminarAnimalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoEliminarAnimalCtrl.awesomeThings.length).toBe(3);
  });
});
