'use strict';

describe('Service: LoteAnimalCompleto', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var LoteAnimalCompleto;
  beforeEach(inject(function (_LoteAnimalCompleto_) {
    LoteAnimalCompleto = _LoteAnimalCompleto_;
  }));

  it('should do something', function () {
    expect(!!LoteAnimalCompleto).toBe(true);
  });

});
