'use strict';

describe('Service: Lote', function () {

  // load the service's module
  beforeEach(module('frontendmuApp'));

  // instantiate service
  var Lote;
  beforeEach(inject(function (_Lote_) {
    Lote = _Lote_;
  }));

  it('should do something', function () {
    expect(!!Lote).toBe(true);
  });

});
