'use strict';

describe('Service: ingresoVario', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var ingresoVario;
  beforeEach(inject(function (_ingresoVario_) {
    ingresoVario = _ingresoVario_;
  }));

  it('should do something', function () {
    expect(!!ingresoVario).toBe(true);
  });

});
