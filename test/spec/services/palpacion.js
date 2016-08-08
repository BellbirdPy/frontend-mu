'use strict';

describe('Service: Palpacion', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Palpacion;
  beforeEach(inject(function (_Palpacion_) {
    Palpacion = _Palpacion_;
  }));

  it('should do something', function () {
    expect(!!Palpacion).toBe(true);
  });

});
