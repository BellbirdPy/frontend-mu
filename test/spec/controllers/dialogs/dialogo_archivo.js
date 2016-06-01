'use strict';

describe('Controller: DialogsDialogoArchivoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogoArchivoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogoArchivoCtrl = $controller('DialogsDialogoArchivoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogoArchivoCtrl.awesomeThings.length).toBe(3);
  });
});
