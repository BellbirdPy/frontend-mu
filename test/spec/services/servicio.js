'use strict';

describe('Service: Servicio', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Servicio;
  beforeEach(inject(function (_Servicio_) {
    Servicio = _Servicio_;
  }));

  it('should do something', function () {
    expect(!!Servicio).toBe(true);
  });

});
