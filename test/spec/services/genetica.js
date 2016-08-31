'use strict';

describe('Service: genetica', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var genetica;
  beforeEach(inject(function (_genetica_) {
    genetica = _genetica_;
  }));

  it('should do something', function () {
    expect(!!genetica).toBe(true);
  });

});
