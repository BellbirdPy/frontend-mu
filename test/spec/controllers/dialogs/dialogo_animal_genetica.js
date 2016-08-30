'use strict';

describe('Controller: DialogsDialogoAnimalGeneticaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoAnimalGeneticaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoAnimalGeneticaCtrl = $controller('DialogsDialogoAnimalGeneticaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoAnimalGeneticaCtrl.awesomeThings.length).toBe(3);
  });
});
