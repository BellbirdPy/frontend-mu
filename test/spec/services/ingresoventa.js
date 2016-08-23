'use strict';

describe('Service: ingresoVenta', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var ingresoVenta;
  beforeEach(inject(function (_ingresoVenta_) {
    ingresoVenta = _ingresoVenta_;
  }));

  it('should do something', function () {
    expect(!!ingresoVenta).toBe(true);
  });

});
