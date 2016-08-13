'use strict';

describe('Service: reporteEgreso', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var reporteEgreso;
  beforeEach(inject(function (_reporteEgreso_) {
    reporteEgreso = _reporteEgreso_;
  }));

  it('should do something', function () {
    expect(!!reporteEgreso).toBe(true);
  });

});
