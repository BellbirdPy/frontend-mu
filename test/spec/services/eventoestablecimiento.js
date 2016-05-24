'use strict';

describe('Service: EventoEstablecimiento', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var EventoEstablecimiento;
  beforeEach(inject(function (_EventoEstablecimiento_) {
    EventoEstablecimiento = _EventoEstablecimiento_;
  }));

  it('should do something', function () {
    expect(!!EventoEstablecimiento).toBe(true);
  });

});
