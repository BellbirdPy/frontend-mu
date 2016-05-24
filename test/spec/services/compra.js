'use strict';

describe('Service: compra', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var compra;
  beforeEach(inject(function (_compra_) {
    compra = _compra_;
  }));

  it('should do something', function () {
    expect(!!compra).toBe(true);
  });

});
