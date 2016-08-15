'use strict';

describe('Service: Inseminacion', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Inseminacion;
  beforeEach(inject(function (_Inseminacion_) {
    Inseminacion = _Inseminacion_;
  }));

  it('should do something', function () {
    expect(!!Inseminacion).toBe(true);
  });

});
