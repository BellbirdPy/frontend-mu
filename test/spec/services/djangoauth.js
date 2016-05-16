'use strict';

describe('Service: DjangoAuth', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var DjangoAuth;
  beforeEach(inject(function (_DjangoAuth_) {
    DjangoAuth = _DjangoAuth_;
  }));

  it('should do something', function () {
    expect(!!DjangoAuth).toBe(true);
  });

});
