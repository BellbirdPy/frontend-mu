'use strict';

describe('Service: Paricion', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Paricion;
  beforeEach(inject(function (_Paricion_) {
    Paricion = _Paricion_;
  }));

  it('should do something', function () {
    expect(!!Paricion).toBe(true);
  });

});
