'use strict';

describe('Service: Raza', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Raza;
  beforeEach(inject(function (_Raza_) {
    Raza = _Raza_;
  }));

  it('should do something', function () {
    expect(!!Raza).toBe(true);
  });

});
