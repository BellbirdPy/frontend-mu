'use strict';

describe('Controller: DialogsDialogoAnimalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoAnimalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoAnimalCtrl = $controller('DialogsDialogoAnimalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoAnimalCtrl.awesomeThings.length).toBe(3);
  });
});
