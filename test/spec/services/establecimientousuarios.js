'use strict';

describe('Service: establecimientoUsuarios', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var establecimientoUsuarios;
  beforeEach(inject(function (_establecimientoUsuarios_) {
    establecimientoUsuarios = _establecimientoUsuarios_;
  }));

  it('should do something', function () {
    expect(!!establecimientoUsuarios).toBe(true);
  });

});
