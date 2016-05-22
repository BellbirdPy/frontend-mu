'use strict';

describe('Service: Nutricion', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Nutricion;
  beforeEach(inject(function (_Nutricion_) {
    Nutricion = _Nutricion_;
  }));

  it('should do something', function () {
    expect(!!Nutricion).toBe(true);
  });

});
