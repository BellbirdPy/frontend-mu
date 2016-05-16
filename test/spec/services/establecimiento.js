'use strict';

describe('Service: Establecimiento', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Establecimiento;
  beforeEach(inject(function (_Establecimiento_) {
    Establecimiento = _Establecimiento_;
  }));

  it('should do something', function () {
    expect(!!Establecimiento).toBe(true);
  });

});
