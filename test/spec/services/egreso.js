'use strict';

describe('Service: egreso', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var egreso;
  beforeEach(inject(function (_egreso_) {
    egreso = _egreso_;
  }));

  it('should do something', function () {
    expect(!!egreso).toBe(true);
  });

});
