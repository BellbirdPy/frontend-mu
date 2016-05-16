'use strict';

describe('Service: Validate', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Validate;
  beforeEach(inject(function (_Validate_) {
    Validate = _Validate_;
  }));

  it('should do something', function () {
    expect(!!Validate).toBe(true);
  });

});
