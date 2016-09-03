'use strict';

describe('Controller: DialogsDialogocrearmiembroCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendmuApp'));

  var DialogsDialogocrearmiembroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsDialogocrearmiembroCtrl = $controller('DialogsDialogocrearmiembroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsDialogocrearmiembroCtrl.awesomeThings.length).toBe(3);
  });
});
