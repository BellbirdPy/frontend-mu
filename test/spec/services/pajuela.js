'use strict';

describe('Service: Pajuela', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Pajuela;
  beforeEach(inject(function (_Pajuela_) {
    Pajuela = _Pajuela_;
  }));

  it('should do something', function () {
    expect(!!Pajuela).toBe(true);
  });

});
