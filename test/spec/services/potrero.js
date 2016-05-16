'use strict';

describe('Service: Potrero', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Potrero;
  beforeEach(inject(function (_Potrero_) {
    Potrero = _Potrero_;
  }));

  it('should do something', function () {
    expect(!!Potrero).toBe(true);
  });

});
