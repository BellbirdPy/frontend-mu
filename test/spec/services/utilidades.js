'use strict';

describe('Service: Utilidades', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Utilidades;
  beforeEach(inject(function (_Utilidades_) {
    Utilidades = _Utilidades_;
  }));

  it('should do something', function () {
    expect(!!Utilidades).toBe(true);
  });

});
