'use strict';

describe('Service: venta', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var venta;
  beforeEach(inject(function (_venta_) {
    venta = _venta_;
  }));

  it('should do something', function () {
    expect(!!venta).toBe(true);
  });

});
