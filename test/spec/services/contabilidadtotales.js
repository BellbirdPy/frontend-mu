'use strict';

describe('Service: contabilidadTotales', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var contabilidadTotales;
  beforeEach(inject(function (_contabilidadTotales_) {
    contabilidadTotales = _contabilidadTotales_;
  }));

  it('should do something', function () {
    expect(!!contabilidadTotales).toBe(true);
  });

});
