'use strict';

describe('Service: Mortandad', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Mortandad;
  beforeEach(inject(function (_Mortandad_) {
    Mortandad = _Mortandad_;
  }));

  it('should do something', function () {
    expect(!!Mortandad).toBe(true);
  });

});
