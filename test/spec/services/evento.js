'use strict';

describe('Service: Evento', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Evento;
  beforeEach(inject(function (_Evento_) {
    Evento = _Evento_;
  }));

  it('should do something', function () {
    expect(!!Evento).toBe(true);
  });

});
