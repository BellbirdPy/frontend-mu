'use strict';

describe('Service: Miembro', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Miembro;
  beforeEach(inject(function (_Miembro_) {
    Miembro = _Miembro_;
  }));

  it('should do something', function () {
    expect(!!Miembro).toBe(true);
  });

});
