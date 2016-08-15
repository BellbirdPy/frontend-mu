'use strict';

describe('Controller: DialogsDialogoLoteGeneticaCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoLoteGeneticaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoLoteGeneticaCtrl = $controller('DialogsDialogoLoteGeneticaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoLoteGeneticaCtrl.awesomeThings.length).toBe(3);
  });
});
